import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { Workspace } from '../../workspaces/entities/workspace.entity';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ default: false })
  @ApiProperty()
  isPrivate: boolean;

  @ManyToOne(() => Workspace, { onDelete: 'CASCADE' })
  @ApiProperty({ type: () => Workspace })
  workspace: Workspace;

  @ManyToMany(() => User)
  @JoinTable()
  @ApiProperty({ type: () => [User] })
  members: User[];

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;
}