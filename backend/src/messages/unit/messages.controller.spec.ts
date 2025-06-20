import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from '../messages.controller';
import { MessagesService } from '../messages.service';

describe('MessagesController', () => {
  let controller: MessagesController;
  let messagesService: MessagesService;

  const mockMessagesService = {
    create: jest.fn(),
    findByChannel: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [
        {
          provide: MessagesService,
          useValue: mockMessagesService,
        },
      ],
    }).compile();

    controller = module.get<MessagesController>(MessagesController);
    messagesService = module.get<MessagesService>(MessagesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a message and return it', async () => {
      const content = 'Hola equipo';
      const channelId = 1;
      const userId = 123;
      const req = { user: { userId } };
      const message = {
        id: 1,
        content,
        channelId,
        userId,
        createdAt: new Date(),
      };

      mockMessagesService.create.mockResolvedValue(message);

      const result = await controller.create(content, channelId, req);

      expect(messagesService.create).toHaveBeenCalledWith(content, channelId, userId);
      expect(result).toEqual(message);
    });
  });

  describe('findByChannel', () => {
    it('should return messages for a given channel', async () => {
      const channelId = 1;
      const messages = [
        { id: 1, content: 'Hola', channelId, userId: 123, createdAt: new Date() },
        { id: 2, content: '¿Cómo están?', channelId, userId: 123, createdAt: new Date() },
      ];

      mockMessagesService.findByChannel.mockResolvedValue(messages);

      const result = await controller.findByChannel(channelId);

      expect(messagesService.findByChannel).toHaveBeenCalledWith(channelId);
      expect(result).toEqual(messages);
    });
  });
});