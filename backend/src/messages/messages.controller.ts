import { Body, Controller, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Message } from './entities/message.entity';

@Controller('messages')
@ApiTags('Messages')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }

  @Post()
  @ApiOperation({ summary: 'Enviar un mensaje a un canal' })
  @ApiBody({
    schema: {
      example: {
        content: 'Hola equipo',
        channelId: 1,
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Mensaje creado', type: Message })
  create(
    @Body('content') content: string,
    @Body('channelId', ParseIntPipe) channelId: number,
    @Request() req,
  ) {
    return this.messagesService.create(content, channelId, req.user.userId);
  }

  @Get('channel/:id')
  @ApiOperation({ summary: 'Listar mensajes de un canal' })
  @ApiParam({ name: 'id', description: 'ID del canal' })
  @ApiResponse({ status: 200, description: 'Mensajes del canal', type: [Message] })
  findByChannel(@Param('id', ParseIntPipe) id: number) {
    return this.messagesService.findByChannel(id);
  }
}