import { Test, TestingModule } from '@nestjs/testing';
import { WorkspacesController } from '../workspaces.controller';
import { WorkspacesService } from '../workspaces.service';

describe('WorkspacesController', () => {
  let controller: WorkspacesController;
  let service: WorkspacesService;

  const mockWorkspacesService = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkspacesController],
      providers: [
        {
          provide: WorkspacesService,
          useValue: mockWorkspacesService,
        },
      ],
    }).compile();

    controller = module.get<WorkspacesController>(WorkspacesController);
    service = module.get<WorkspacesService>(WorkspacesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a workspace with name and userId', async () => {
      const name = 'Mi Workspace';
      const userId = 123;
      const req = { user: { userId } };
      const createdWorkspace = { id: 1, name, ownerId: userId };

      mockWorkspacesService.create.mockResolvedValue(createdWorkspace);

      const result = await controller.create(name, req);

      expect(service.create).toHaveBeenCalledWith(name, userId);
      expect(result).toEqual(createdWorkspace);
    });
  });

  describe('findAll', () => {
    it('should return an array of workspaces', async () => {
      const workspaces = [
        { id: 1, name: 'Team A' },
        { id: 2, name: 'Team B' },
      ];

      mockWorkspacesService.findAll.mockResolvedValue(workspaces);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(workspaces);
    });
  });
});