import { Test, TestingModule } from '@nestjs/testing';
import { ChannelsController } from '../channels.controller';
import { ChannelsService } from '../channels.service';

describe('ChannelsController', () => {
  let controller: ChannelsController;
  let service: ChannelsService;

  const mockChannelsService = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChannelsController],
      providers: [
        {
          provide: ChannelsService,
          useValue: mockChannelsService,
        },
      ],
    }).compile();

    controller = module.get<ChannelsController>(ChannelsController);
    service = module.get<ChannelsService>(ChannelsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new channel', async () => {
      const name = 'general';
      const isPrivate = false;
      const workspaceId = 1;
      const req = { user: { userId: 42 } };
      const created = { id: 1, name: 'general' };

      mockChannelsService.create.mockResolvedValue(created);

      const result = await controller.create(name, isPrivate, workspaceId, req);
      expect(service.create).toHaveBeenCalledWith(name, isPrivate, workspaceId, req.user.userId);
      expect(result).toEqual(created);
    });
  });
});
