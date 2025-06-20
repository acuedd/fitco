import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from '../messages.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Message } from '../entities/message.entity';
import { Channel } from '../../channels/entities/channel.entity';
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

describe('MessagesService', () => {
  let service: MessagesService;
  let messageRepo: MockRepo<Message>;
  let channelRepo: MockRepo<Channel>;
  let userRepo: MockRepo<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        { provide: getRepositoryToken(Message), useValue: createMockRepo() },
        { provide: getRepositoryToken(Channel), useValue: createMockRepo() },
        { provide: getRepositoryToken(User), useValue: createMockRepo() },
      ],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
    messageRepo = module.get(getRepositoryToken(Message));
    channelRepo = module.get(getRepositoryToken(Channel));
    userRepo = module.get(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const content = 'Mensaje de prueba';
    const channelId = 1;
    const userId = 2;

    it('should create and save a new message', async () => {
      const channel = { id: channelId };
      const user = { id: userId };
      const message = { content, channel, author: user };

      (channelRepo.findOne!).mockResolvedValue(channel);
      (userRepo.findOne!).mockResolvedValue(user);
      (messageRepo.create!).mockReturnValue(message);
      (messageRepo.save!).mockResolvedValue({ ...message, id: 123 });

      const result = await service.create(content, channelId, userId);

      expect(channelRepo.findOne).toHaveBeenCalledWith({ where: { id: channelId } });
      expect(userRepo.findOne).toHaveBeenCalledWith({ where: { id: userId } });
      expect(messageRepo.create).toHaveBeenCalledWith({ content, channel, author: user });
      expect(messageRepo.save).toHaveBeenCalledWith(message);
      expect(result).toEqual({ ...message, id: 123 });
    });

    it('should throw NotFoundException if channel not found', async () => {
      (channelRepo.findOne!).mockResolvedValue(null);
      await expect(service.create(content, channelId, userId)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if user not found', async () => {
      (channelRepo.findOne!).mockResolvedValue({ id: channelId });
      (userRepo.findOne!).mockResolvedValue(null);
      await expect(service.create(content, channelId, userId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByChannel', () => {
    it('should return messages sorted by createdAt', async () => {
      const channelId = 1;
      const messages = [
        { id: 1, content: 'Hola', createdAt: new Date() },
        { id: 2, content: '¿Qué tal?', createdAt: new Date() },
      ];

      messageRepo.find?.mockResolvedValue(messages);

      const result = await service.findByChannel(channelId);

      expect(messageRepo.find).toHaveBeenCalledWith({
        where: { channel: { id: channelId } },
        order: { createdAt: 'ASC' },
      });

      expect(result).toEqual(messages);
    });
  });
});