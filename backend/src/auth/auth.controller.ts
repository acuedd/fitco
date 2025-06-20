import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión de usuario' })
  @ApiBody({
    schema: {
      example: {
        email: 'user@example.com',
        password: 'supersecret',
      },
    },
  })
  @ApiResponse({ status: 201, description: 'JWT generado' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) throw new Error('Unauthorized');
    return this.authService.login(user);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiBody({
    schema: {
      example: {
        email: 'newuser@example.com',
        password: 'supersecure',
        name: 'Nuevo Usuario',
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Usuario registrado correctamente' })
  async register(@Body() body: { email: string; password: string; name: string }) {
    return this.authService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener datos del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil del usuario' })
  @ApiResponse({ status: 401, description: 'Token inválido o ausente' })
  getProfile(@Request() req) {
    return req.user;
  }
}