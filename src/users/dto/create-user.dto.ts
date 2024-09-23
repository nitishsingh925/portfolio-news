// src/users/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The unique username of the user',
    example: 'nitish',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'nitish@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user (min length 6 characters)',
    example: 'strongpassword',
  })
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'The role of the user, default is "user"',
    example: 'user',
    required: false,
  })
  @IsOptional()
  role?: string;
}
