import { Injectable } from '@nestjs/common';
import { Equal, FindConditions, Like } from 'typeorm';

import { PageMetaDto } from '../../common/dto/PageMetaDto';
import { UserRegisterDto } from '../auth/dto/UserRegisterDto';
import { UsersPageDto } from './dto/UsersPageDto';
import { UsersPageOptionsDto } from './dto/UsersPageOptionsDto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  /**
   * Find single user
   */
  findOne(
    findData: FindConditions<UserEntity>,
  ): Promise<UserEntity | undefined> {
    return this._userRepository.findOne(findData);
  }

  async createUser(userRegisterDto: UserRegisterDto): Promise<UserEntity> {
    const user = this._userRepository.create({ ...userRegisterDto });
    return this._userRepository.save(user);
  }

  async getUsers(pageOptionsDto: UsersPageOptionsDto): Promise<UsersPageDto> {
    const where: FindConditions<UserEntity> = {};
    if (pageOptionsDto.q) {
      where.lastName = Like(`%${pageOptionsDto.q}%`);
    }
    if (pageOptionsDto.melliCode) {
      where.melliCode = Equal(pageOptionsDto.melliCode);
    }
    const [users, usersCount] = await this._userRepository.findAndCount({
      where,
      take: pageOptionsDto.take,
      skip: pageOptionsDto.skip,
      order: {
        createdAt: pageOptionsDto.order,
      },
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: usersCount,
    });
    return new UsersPageDto(users.toDtos(), pageMetaDto);
  }
}
