import { Test, TestingModule } from '@nestjs/testing';
import { ChannelsService } from '../channels.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Channel } from '../entities/channel.entity';
import { Workspace } from '../../workspaces/entities/workspace.entity';
import { User } from '../../users/entities/user.entity';
import { ObjectLiteral, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

type MockRepo<T extends ObjectLiteral = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

function createMockRepo<T extends ObjectLiteral>(): MockRepo<T> {
  return {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  };
}

describe('ChannelsService', () => {
  let service: ChannelsService;
  let channelRepo: MockRepo<Channel>;
  let workspaceRepo: MockRepo<Workspace>;
  let userRepo: MockRepo<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelsService,
        { provide: getRepositoryToken(Channel), useValue: createMockRepo() },
        { provide: getRepositoryToken(Workspace), useValue: createMockRepo() },
        { provide: getRepositoryToken(User), useValue: createMockRepo() },
      ],
    }).compile();

    service = module.get<ChannelsService>(ChannelsService);
    channelRepo = module.get(getRepositoryToken(Channel));
    workspaceRepo = module.get(getRepositoryToken(Workspace));
    userRepo = module.get(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create and save a new channel', async () => {
      const workspace = { id: 1 };
      const user = { id: 2 };
      const createdChannel = { id: 3, name: 'general', isPrivate: false, workspace, members: [user] };

      workspaceRepo.findOne!.mockResolvedValue(workspace);
      userRepo.findOne!.mockResolvedValue(user);
      channelRepo.create!.mockReturnValue(createdChannel);
      channelRepo.save!.mockResolvedValue(createdChannel);

      const result = await service.create('general', false, 1, 2);

      expect(workspaceRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(userRepo.findOne).toHaveBeenCalledWith({ where: { id: 2 } });
      expect(channelRepo.create).toHaveBeenCalledWith({ name: 'general', isPrivate: false, workspace, members: [user] });
      expect(channelRepo.save).toHaveBeenCalledWith(createdChannel);
      expect(result).toEqual(createdChannel);
    });

    it('should throw NotFoundException if workspace not found', async () => {
      workspaceRepo.findOne?.mockResolvedValue(null);
      await expect(service.create('name', false, 1, 2)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if user not found', async () => {
      workspaceRepo.findOne?.mockResolvedValue({ id: 1 });
      userRepo.findOne?.mockResolvedValue(null);
      await expect(service.create('name', false, 1, 2)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByWorkspace', () => {
    it('should return a list of channels with relations', async () => {
      const channels = [{ id: 1, name: 'general', workspace: {}, members: [] }];
      channelRepo.find?.mockResolvedValue(channels);

      const result = await service.findByWorkspace(1);

      expect(channelRepo.find).toHaveBeenCalledWith({
        where: { workspace: { id: 1 } },
        relations: ['workspace', 'members'],
      });

      expect(result).toEqual(channels);
    });
  });
});