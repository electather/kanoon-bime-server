import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import {
  runOnTransactionCommit,
  runOnTransactionComplete,
  runOnTransactionRollback,
  Transactional,
} from 'typeorm-transactional-cls-hooked';

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
  async findByUsernameOrEmail(
    options: Partial<{ username: string; email: string }>,
  ): Promise<UserEntity | undefined> {
    const queryBuilder = this._userRepository.createQueryBuilder('user');

    if (options.email) {
      queryBuilder.orWhere('user.email = :email', {
        email: options.email,
      });
    }
    if (options.username) {
      queryBuilder.orWhere('user.username = :username', {
        username: options.username,
      });
    }

    return queryBuilder.getOne();
  }

  @Transactional()
  async createUser(userRegisterDto: UserRegisterDto): Promise<UserEntity> {
    const user = this._userRepository.create({ ...userRegisterDto });
    runOnTransactionCommit(() => console.info('user created'));
    runOnTransactionRollback((e) => console.info('user not created', e));
    runOnTransactionComplete(() =>
      console.info('transaction completed for user!'),
    );
    return this._userRepository.save(user);
  }

  async getUsers(pageOptionsDto: UsersPageOptionsDto): Promise<UsersPageDto> {
    const queryBuilder = this._userRepository.createQueryBuilder('user');
    const [users, usersCount] = await queryBuilder
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .getManyAndCount();

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: usersCount,
    });
    return new UsersPageDto(users.toDtos(), pageMetaDto);
  }
}
