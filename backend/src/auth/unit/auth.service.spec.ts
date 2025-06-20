import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUsersService = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('should return user without password if credentials are valid', async () => {
      const user = {
        id: 1,
        email: 'test@example.com',
        password: await bcrypt.hash('secret', 10),
        name: 'Test User',
      };

      mockUsersService.findByEmail.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const result = await service.validateUser(user.email, 'secret');

      expect(usersService.findByEmail).toHaveBeenCalledWith(user.email);
      expect(result).toEqual({
        id: user.id,
        email: user.email,
        name: user.name,
      });
    });

    it('should return null if user not found or password does not match', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);

      const result = await service.validateUser('notfound@example.com', 'pass');
      expect(result).toBeNull();

      mockUsersService.findByEmail.mockResolvedValue({
        id: 1,
        email: 'found@example.com',
        password: 'hashed',
      });

      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      const result2 = await service.validateUser('found@example.com', 'wrong');
      expect(result2).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access token', async () => {
      const user = { id: 1, email: 'user@example.com' };
      const token = 'jwt.token';

      mockJwtService.sign.mockReturnValue(token);

      const result = await service.login(user);

      expect(jwtService.sign).toHaveBeenCalledWith({ username: user.email, sub: user.id });
      expect(result).toEqual({ access_token: token });
    });
  });

  describe('register', () => {
    it('should hash password and call usersService.create', async () => {
      const data = {
        email: 'new@example.com',
        password: '123456',
        name: 'New User',
      };

      const hashedPassword = await bcrypt.hash(data.password, 10);
      const createdUser = { id: 2, ...data, password: hashedPassword };

      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);
      mockUsersService.create.mockResolvedValue(createdUser);

      const result = await service.register(data);

      expect(bcrypt.hash).toHaveBeenCalledWith(data.password, 10);
      expect(usersService.create).toHaveBeenCalledWith({
        ...data,
        password: hashedPassword,
      });
      expect(result).toEqual(createdUser);
    });
  });
});