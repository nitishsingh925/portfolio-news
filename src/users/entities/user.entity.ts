// src/users/user.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ example: 1, description: 'The unique ID of the user' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Nitish ',
    description: 'The unique username of the user',
  })
  @Column({ unique: true })
  username: string;

  @ApiProperty({
    example: 'nitish@example.com',
    description: 'The email address of the user',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: 'strongpassword',
    description: 'The password of the user',
  })
  @Column()
  password: string;

  @ApiProperty({ example: 'user', description: 'The role of the user' })
  @Column({ default: 'user' })
  role: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'The timestamp when the user was created',
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'The timestamp when the user was last updated',
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
