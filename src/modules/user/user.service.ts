import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { UserCreateDto } from './dto/UserCreateDto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';






@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async findOne(findData: FindConditions<UserEntity>): Promise<UserEntity> {
    return this.userRepository.findOne(findData);
  }

  async create(userDto: UserCreateDto): Promise<UserEntity> {
    const createdUser = await this.userRepository.save(this.userRepository.create(userDto));
    return createdUser;
  }

}
