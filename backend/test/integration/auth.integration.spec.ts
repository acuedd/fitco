import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthService } from '../../src/auth/auth.service';
import { UsersService } from '../../src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthController (integration)', () => {
  let app: INestApplication;

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    password: '', // Will be set in beforeAll
    name: 'Test User',
  };

  const mockUsersService = {
    findByEmail: jest.fn().mockImplementation((email) =>
      email === mockUser.email ? Promise.resolve(mockUser) : Promise.resolve(null),
    ),
    create: jest.fn().mockResolvedValue(mockUser),
  };

  const mockAuthService = {
    validateUser: jest.fn().mockImplementation(async (email, password) => {
      const match = await bcrypt.compare(password, mockUser.password);
      return match ? { id: mockUser.id, email: mockUser.email, name: mockUser.name } : null;
    }),
    login: jest.fn().mockImplementation((user) => ({
      access_token: 'mocked.jwt.token',
    })),
    register: jest.fn().mockResolvedValue(mockUser),
  };

  beforeAll(async () => {
    mockUser.password = await bcrypt.hash('supersecret', 10);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
      imports: [
        JwtModule.register({
          secret: 'testsecret',
          signOptions: { expiresIn: '1h' },
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/auth/login (POST)', () => {
    it('should return a JWT token if credentials are valid', async () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'test@example.com', password: 'supersecret' })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('access_token');
        });
    });

    it('should return 401 if credentials are invalid', async () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'test@example.com', password: 'wrongpassword' })
        .expect(401)
        .expect((res) => {
          expect(res.body.message).toContain('Credenciales inválidas');
        });
    });
  });

  describe('/auth/register (POST)', () => {
    it('should return created user', async () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({ email: 'newuser@example.com', password: 'supersecure', name: 'Nuevo Usuario' })
        .expect(201)
        .expect((res) => {
          expect(res.body).toMatchObject({
            id: mockUser.id,
            email: mockUser.email,
            name: mockUser.name,
          });
        });
    });
  });
});