import { Test, TestingModule } from '@nestjs/testing';
import { WorkspacesService } from '../workspaces.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Workspace } from '../entities/workspace.entity';
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

describe('WorkspacesService', () => {
  let service: WorkspacesService;
  let workspaceRepo: MockRepo<Workspace>;
  let userRepo: MockRepo<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkspacesService,
        {
          provide: getRepositoryToken(Workspace),
          useValue: createMockRepo(),
        },
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepo(),
        },
      ],
    }).compile();

    service = module.get<WorkspacesService>(WorkspacesService);
    workspaceRepo = module.get(getRepositoryToken(Workspace));
    userRepo = module.get(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create and save a workspace with user as member', async () => {
      const userId = 1;
      const name = 'Mi Workspace';
      const user = { id: userId };
      const workspace = { id: 10, name, members: [user] };

      userRepo.findOne!.mockResolvedValue(user);
      workspaceRepo.create!.mockReturnValue(workspace);
      workspaceRepo.save!.mockResolvedValue(workspace);

      const result = await service.create(name, userId);

      expect(userRepo.findOne).toHaveBeenCalledWith({ where: { id: userId } });
      expect(workspaceRepo.create).toHaveBeenCalledWith({ name, members: [user] });
      expect(workspaceRepo.save).toHaveBeenCalledWith(workspace);
      expect(result).toEqual(workspace);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      userRepo.findOne!.mockResolvedValue(null);
      await expect(service.create('Workspace X', 999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return all workspaces with members relation', async () => {
      const workspaces = [{ id: 1, name: 'Team A', members: [] }];
      workspaceRepo.find!.mockResolvedValue(workspaces);

      const result = await service.findAll();

      expect(workspaceRepo.find).toHaveBeenCalledWith({ relations: ['members'] });
      expect(result).toEqual(workspaces);
    });
  });
});