import { Injectable, UnauthorizedException } from '@nestjs/common';
import { identity, pickBy } from 'lodash';
import { DeepPartial, FindConditions, FindOneOptions, Like } from 'typeorm';

import { PageMetaDto } from '../../common/dto/PageMetaDto';
import { UserNotFoundException } from '../../exceptions/user-not-found.exception';
import { UserRegisterDto } from '../auth/dto/UserRegisterDto';
import { UserInfoService } from '../userInfo/userInfo.service';
import { UserCreateDTO } from './dto/UserCreateDto';
import { UserDto } from './dto/UserDto';
import { UsersPageDto } from './dto/UsersPageDto';
import { UsersPageOptionsDto } from './dto/UsersPageOptionsDto';
import { UserUpdateDto } from './dto/UsersUpdateDto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _userInfoService: UserInfoService,
  ) {}

  /**
   * Find single user
   */
  async findOne(
    findData: FindConditions<UserEntity>,
    options?: FindOneOptions<UserEntity>,
  ): Promise<UserEntity> {
    const user = await this._userRepository.findOne(findData, options);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  async createUser(
    {
      melliCode,
      address,
      melliCardScanFrontId,
      melliCardScanBackId,
      payrollScanId,
      // eslint-disable-next-line @typescript-eslint/tslint/config
      ...userRegisterDto
    }: UserCreateDTO,
    creator: UserEntity,
  ) {
    const create: DeepPartial<UserEntity> = {
      ...userRegisterDto,
    };
    if (userRegisterDto.avatarId) {
      create.avatar = { id: userRegisterDto.avatarId };
      delete (<any>create).avatarId;
    }

    create.creator = { id: creator.id };

    const user = await this._userRepository.save(
      this._userRepository.create(create),
    );

    await this._userInfoService.createUserInfo({
      melliCode,
      address,
      melliCardScanFrontId,
      melliCardScanBackId,
      payrollScanId,
      userId: user.id,
    });

    return user;
  }

  async registerUser(
    { melliCode, ...userRegisterDto }: UserRegisterDto,
    creator?: UserEntity,
  ) {
    const create: DeepPartial<UserEntity> = {
      ...userRegisterDto,
    };
    if (userRegisterDto.avatarId) {
      create.avatar = { id: userRegisterDto.avatarId };
      delete (<any>create).avatarId;
    }

    if (creator) {
      create.creator = { id: creator.id };
    }

    const user = await this._userRepository.save(
      this._userRepository.create(create),
    );

    await this._userInfoService.createUserInfo({ melliCode, userId: user.id });

    return user;
  }

  async getUsers(pageOptionsDto: UsersPageOptionsDto): Promise<UsersPageDto> {
    const where: FindConditions<UserEntity> = {};
    if (pageOptionsDto.q) {
      where.lastName = Like(`%${pageOptionsDto.q}%`);
    }
    if (pageOptionsDto.melliCode) {
      where.info = { melliCode: Like(`%${pageOptionsDto.melliCode}%`) };
    }

    const [users, usersCount] = await this._userRepository.findAndCount({
      where,
      take: pageOptionsDto.take,
      skip: pageOptionsDto.skip,
      order: {
        createdAt: pageOptionsDto.order,
      },
      relations: ['info'],
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: usersCount,
    });
    return new UsersPageDto(users.toDtos(), pageMetaDto);
  }

  async updateUser(
    id: string,
    userUpdateDto: UserUpdateDto,
    editor?: UserEntity,
  ): Promise<UserDto> {
    const found = await this.findOne(
      { id },
      {
        relations: ['creator'],
      },
    );
    if (found.creator?.id && found.creator?.id !== editor?.id) {
      throw new UnauthorizedException('you are not the creator!');
    }

    const update: DeepPartial<UserEntity> = {
      ...userUpdateDto,
      creator: { id: editor?.id },
    };

    if (userUpdateDto.avatarId) {
      update.avatar = { id: userUpdateDto.avatarId };
      delete (<any>update).avatarId;
    }
    await this._userRepository.update(id, pickBy(update, identity));
    return found.toDto();
  }
}
