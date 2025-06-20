import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workspace } from './entities/workspace.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspace)
    private workspaceRepo: Repository<Workspace>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  async create(name: string, userId: number): Promise<Workspace> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const workspace = this.workspaceRepo.create({ name, members: [user] });
    return this.workspaceRepo.save(workspace);
  }

  findAll(): Promise<Workspace[]> {
    return this.workspaceRepo.find({ relations: ['members'] });
  }
}