import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { Channel } from '../channels/entities/channel.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepo: Repository<Message>,

    @InjectRepository(Channel)
    private channelRepo: Repository<Channel>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  async create(content: string, channelId: number, userId: number): Promise<Message> {
    const channel = await this.channelRepo.findOne({ where: { id: channelId } });
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!channel) throw new NotFoundException('Channel not found');
    if (!user) throw new NotFoundException('User not found');

    const message = this.messageRepo.create({ content, channel, author: user });
    return this.messageRepo.save(message);
  }

  async findByChannel(channelId: number): Promise<Message[]> {
    return this.messageRepo.find({
      where: { channel: { id: channelId } },
      order: { createdAt: 'ASC' },
    });
  }
}