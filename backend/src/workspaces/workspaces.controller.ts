import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('workspaces')
@ApiTags('Workspaces')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class WorkspacesController {
  constructor(private readonly workspaceService: WorkspacesService) { }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo workspace' })
  @ApiBody({ schema: { example: { name: 'Mi Workspace' } } })
  @ApiResponse({ status: 201, description: 'Workspace creado correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  create(@Body('name') name: string, @Request() req) {
    return this.workspaceService.create(name, req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los workspaces' })
  @ApiResponse({ status: 200, description: 'Lista de workspaces' })
  findAll() {
    return this.workspaceService.findAll();
  }
}