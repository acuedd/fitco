import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'Edward' })
  name: string;

  @ApiProperty({ example: '2025-06-20T00:00:00.000Z' })
  createdAt: Date;
}