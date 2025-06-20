import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from './entities/channel.entity';
import { Repository } from 'typeorm';
import { Workspace } from '../workspaces/entities/workspace.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Channel)
    private channelRepo: Repository<Channel>,

    @InjectRepository(Workspace)
    private workspaceRepo: Repository<Workspace>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  async create(name: string, isPrivate: boolean, workspaceId: number, userId: number) {
    const workspace = await this.workspaceRepo.findOne({ where: { id: workspaceId } });
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!workspace) throw new NotFoundException('Workspace not found');
    if (!user) throw new NotFoundException('User not found');

    const channel = this.channelRepo.create({ name, isPrivate, workspace, members: [user] });
    return this.channelRepo.save(channel);
  }

  async findByWorkspace(workspaceId: number) {
    return this.channelRepo.find({
      where: { workspace: { id: workspaceId } },
      relations: ['workspace', 'members'],
    });
  }

  async findById(id: number): Promise<Channel> {
    const channel = await this.channelRepo.findOne({
      where: { id },
      relations: ['members', 'workspace'],
    });

    if (!channel) {
      throw new NotFoundException(`Channel with id ${id} not found`);
    }

    return channel;
  }

  async addUserToChannel(channelId: number, userId: number): Promise<Channel> {
    const channel = await this.channelRepo.findOne({
      where: { id: channelId },
      relations: ['members'],
    });
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!channel) throw new NotFoundException('Channel not found');
    if (!user) throw new NotFoundException('User not found');

    channel.members.push(user);
    return this.channelRepo.save(channel);
  }

  async removeUserFromChannel(channelId: number, userId: number): Promise<Channel> {
    const channel = await this.channelRepo.findOne({
      where: { id: channelId },
      relations: ['members'],
    });

    if (!channel) throw new NotFoundException('Channel not found');

    channel.members = channel.members.filter((member) => member.id !== userId);
    return this.channelRepo.save(channel);
  }
}