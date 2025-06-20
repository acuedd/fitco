import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

type MockRepo<T extends ObjectLiteral = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

function createMockRepo<T extends ObjectLiteral>(): MockRepo<T> {
  return {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  };
}

describe('UsersService', () => {
  let service: UsersService;
  let usersRepo: MockRepo<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepo(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepo = module.get(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      const user = { id: 1, email: 'test@example.com' };
      usersRepo.findOne!.mockResolvedValue(user);

      const result = await service.findByEmail('test@example.com');
      expect(usersRepo.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
      expect(result).toEqual(user);
    });
  });

  describe('create', () => {
    it('should create and save a user', async () => {
      const data = { email: 'new@example.com', name: 'New User' };
      const user = { id: 1, ...data };

      usersRepo.create!.mockReturnValue(user);
      usersRepo.save!.mockResolvedValue(user);

      const result = await service.create(data);
      expect(usersRepo.create).toHaveBeenCalledWith(data);
      expect(usersRepo.save).toHaveBeenCalledWith(user);
      expect(result).toEqual(user);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [
        { id: 1, email: 'a@example.com' },
        { id: 2, email: 'b@example.com' },
      ];

      usersRepo.find!.mockResolvedValue(users);
      const result = await service.findAll();

      expect(usersRepo.find).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('findById', () => {
    it('should return a user by id', async () => {
      const user = { id: 1, email: 'test@example.com' };
      usersRepo.findOne!.mockResolvedValue(user);

      const result = await service.findById(1);
      expect(usersRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(user);
    });
  });
});