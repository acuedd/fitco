import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Channel } from '../../channels/entities/channel.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  content: string;

  @ManyToOne(() => User, { eager: true })
  @ApiProperty({ type: () => User })
  author: User;

  @ManyToOne(() => Channel, { onDelete: 'CASCADE' })
  @ApiProperty({ type: () => Channel })
  channel: Channel;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;
}