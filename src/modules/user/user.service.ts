import { Injectable } from '@nestjs/common';
import { identity, pickBy } from 'lodash';
import { DeepPartial, Equal, FindConditions, Like } from 'typeorm';

import { PageMetaDto } from '../../common/dto/PageMetaDto';
import { UserNotFoundException } from '../../exceptions/user-not-found.exception';
import { UserRegisterDto } from '../auth/dto/UserRegisterDto';
import { UserDto } from './dto/UserDto';
import { UsersPageDto } from './dto/UsersPageDto';
import { UsersPageOptionsDto } from './dto/UsersPageOptionsDto';
import { UserUpdateDto } from './dto/UsersUpdateDto';
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
    const create: DeepPartial<UserEntity> = {
      ...userRegisterDto,
    };
    if (userRegisterDto.avatarId) {
      create.avatar = { id: userRegisterDto.avatarId };
      delete (<any>create).avatarId;
    }

    const user = this._userRepository.create(create);
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

  async updateUser(id: string, userUpdateDto: UserUpdateDto): Promise<UserDto> {
    const found = await this.findOne({ id });
    if (!found) {
      throw new UserNotFoundException();
    }

    const update: DeepPartial<UserEntity> = {
      ...userUpdateDto,
    };
    if (userUpdateDto.avatarId) {
      update.avatar = { id: userUpdateDto.avatarId };
      delete (<any>update).avatarId;
    }
    await this._userRepository.update(id, pickBy(update, identity));
    return found.toDto();
  }
}
