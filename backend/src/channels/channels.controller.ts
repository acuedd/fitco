import { Body, Controller, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Channel } from './entities/channel.entity';

@Controller('channels')
@ApiTags('Channels')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) { }

  @Post()
  @ApiOperation({ summary: 'Crear un canal en un workspace' })
  @ApiBody({
    schema: {
      example: {
        name: 'general',
        isPrivate: false,
        workspaceId: 1,
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Canal creado', type: Channel })
  create(
    @Body('name') name: string,
    @Body('isPrivate') isPrivate: boolean,
    @Body('workspaceId', ParseIntPipe) workspaceId: number,
    @Request() req,
  ) {
    return this.channelsService.create(name, isPrivate, workspaceId, req.user.userId);
  }

  @Get('workspace/:id')
  @ApiOperation({ summary: 'Listar canales de un workspace' })
  @ApiParam({ name: 'id', description: 'ID del workspace' })
  @ApiResponse({ status: 200, description: 'Canales del workspace', type: [Channel] })
  findByWorkspace(@Param('id', ParseIntPipe) id: number) {
    return this.channelsService.findByWorkspace(id);
  }
}