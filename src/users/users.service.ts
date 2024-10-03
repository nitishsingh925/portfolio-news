// src/users/users.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Create a new user after verifying if username or email already exists.
   * @param createUserDto - The DTO containing user data
   * @returns The newly created user or throws a ConflictException
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if a user with the same username or email already exists
    const existingUserByUsername = await this.findOneByUsername(
      createUserDto.username,
    );
    const existingUserByEmail = await this.findOneByEmail(createUserDto.email);

    if (existingUserByUsername) {
      throw new ConflictException('Username already exists');
    }

    if (existingUserByEmail) {
      throw new ConflictException('Email already exists');
    }

    // Hash the password before saving the user
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );

    // Create and save the new user
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashPassword,
    });

    return this.usersRepository.save(newUser);
  }

  /**
   * Find all users.
   * @returns A list of all users
   */
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  /**
   * Find a user by ID.
   * @param id - The user ID
   * @returns The user or undefined
   */
  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  /**
   * Update a user by ID.
   * @param id - The user ID
   * @param updateUserDto - DTO containing update data
   * @returns The updated user
   */
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  /**
   * Delete a user by ID.
   * @param id - The user ID
   */
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  /**
   * Find a user by username.
   * @param username - The user's username
   * @returns The user or undefined
   */
  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  /**
   * Find a user by email.
   * @param email - The user's email
   * @returns The user or undefined
   */
  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findOneById(userId: number): Promise<User | undefined> {
    const options: FindOneOptions<User> = { where: { id: userId } };
    return this.usersRepository.findOne(options);
  }
}
