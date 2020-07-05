import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { identity, pickBy } from 'lodash';
import {
  DeepPartial,
  Equal,
  FindConditions,
  FindOneOptions,
  Like,
} from 'typeorm';

import { RoleType } from '../../common/constants/role-type';
import { OwnerShipChangeDto } from '../../common/dto/OwnerShipChangeDto';
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
    const melliCodeRegistered = await this._userInfoService.findOne(
      { melliCode },
      true,
    );
    if (melliCodeRegistered) {
      throw new ConflictException('error.unique.melliCode');
    }

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
    const melliCodeRegistered = await this._userInfoService.findOne(
      { melliCode },
      true,
    );
    if (melliCodeRegistered?.id) {
      throw new ConflictException('error.unique.melliCode');
    }
    const user = await this._userRepository.save(
      this._userRepository.create(create),
    );

    await this._userInfoService.createUserInfo({ melliCode, userId: user.id });

    return user;
  }
  /**
   * @deprecated
   *
   * @param {UsersPageOptionsDto} pageOptionsDto
   * @returns {Promise<UsersPageDto>}
   * @memberof UserService
   */
  async getUsers(pageOptionsDto: UsersPageOptionsDto): Promise<UsersPageDto> {
    const where: FindConditions<UserEntity>[] = [];
    if (pageOptionsDto.q) {
      where.push(
        { firstName: Like(`%${pageOptionsDto.q}%`) },
        { lastName: Like(`%${pageOptionsDto.q}%`) },
      );
    }
    if (pageOptionsDto.melliCode) {
      where.push({
        info: { melliCode: Like(`%${pageOptionsDto.melliCode}%`) },
      });
    }
    if (pageOptionsDto.phone) {
      where.push({
        phone: Like(`%${pageOptionsDto.melliCode}%`),
      });
    }
    const [users, usersCount] = await this._userRepository.findAndCount({
      where,
      take: pageOptionsDto.take,
      skip: pageOptionsDto.skip,
      order: {
        createdAt: pageOptionsDto.order,
      },
      relations: ['info', 'avatar'],
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: usersCount,
    });
    return new UsersPageDto(users.toDtos(), pageMetaDto);
  }

  async getUsersAlt(
    pageOptionsDto: UsersPageOptionsDto,
  ): Promise<UsersPageDto> {
    const qb = this._userRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.info', 'info')
      .leftJoinAndSelect('users.avatar', 'avatar')
      .take(pageOptionsDto.take)
      .skip(pageOptionsDto.skip)
      .where('users.role = :role', { role: RoleType.BIME_GOZAR });
    if (pageOptionsDto.q) {
      qb.orWhere('users.first_name LIKE :firstName', {
        firstName: pageOptionsDto.q,
      });
      qb.orWhere('users.last_name LIKE :lastName', {
        lastName: pageOptionsDto.q,
      });
    }
    if (pageOptionsDto.melliCode) {
      qb.andWhere('info.melli_code LIKE :melliCode', {
        melliCode: '%' + pageOptionsDto.melliCode + '%',
      });
    }
    if (pageOptionsDto.phone) {
      qb.andWhere('users.phone LIKE :phone', {
        phone: '%' + pageOptionsDto.phone + '%',
      });
    }
    const [users, usersCount] = await qb.getManyAndCount();
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: usersCount,
    });

    return new UsersPageDto(users.toDtos(), pageMetaDto);
  }

  async updateUser(
    id: string,
    userUpdateDto: UserUpdateDto,
    editor: UserEntity,
  ): Promise<UserDto> {
    const found = await this.findOne({ id });
    if (
      editor.role !== RoleType.ADMIN &&
      found.creatorId &&
      found.creatorId !== editor?.id
    ) {
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

  async deleteUser(id: string, editor: UserEntity): Promise<UserDto> {
    const found = await this.findOne({ id });
    if (
      editor.role !== RoleType.ADMIN &&
      found.creatorId &&
      found.creatorId !== editor?.id
    ) {
      throw new UnauthorizedException('you are not the creator!');
    }
    await this._userRepository.delete(id);
    return found.toDto();
  }

  async changeOwnership({ nextOwner, pervOwner }: OwnerShipChangeDto) {
    const res = await this._userRepository.update(
      { creatorId: Equal(pervOwner) },
      { creator: { id: nextOwner } },
    );
    return {
      effected: res.affected ?? 0,
    };
  }
}
