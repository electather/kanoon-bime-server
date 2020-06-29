import { Injectable, NotFoundException } from '@nestjs/common';
import { identity, pickBy } from 'lodash';
import { DeepPartial, FindConditions, Like } from 'typeorm';

import { PageMetaDto } from '../../common/dto/PageMetaDto';
import { UserInfoCreateDto } from './dto/UserInfoCreateDto';
import { UserInfoDto } from './dto/UserInfoDto';
import { UserInfosPageDto } from './dto/UserInfoPageDto';
import { UserInfosPageOptionsDto } from './dto/UserInfoPageOptionsDto';
import { UserInfoUpdateDto } from './dto/UserInfoUpdateDto';
import { UserInfoEntity } from './userInfo.entity';
import { UserInfoRepository } from './userInfo.repository';

@Injectable()
export class UserInfoService {
  constructor(private readonly _userInfoRepository: UserInfoRepository) {}

  /**
   * Find single userInfo
   */
  async findOne(
    options: FindConditions<UserInfoEntity>,
  ): Promise<UserInfoEntity> {
    const userInfo = await this._userInfoRepository.findOne(options);
    if (!userInfo) {
      throw new NotFoundException();
    }
    return userInfo;
  }

  async getUserInfos(
    pageOptionsDto: UserInfosPageOptionsDto,
  ): Promise<UserInfosPageDto> {
    const where: FindConditions<UserInfoEntity> = {};
    if (pageOptionsDto.q) {
      where.melliCode = Like(`%${pageOptionsDto.q}%`);
    }
    const [
      userInfos,
      userInfosCount,
    ] = await this._userInfoRepository.findAndCount({
      where,
      take: pageOptionsDto.take,
      skip: pageOptionsDto.skip,
      order: {
        createdAt: pageOptionsDto.order,
      },
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: userInfosCount,
    });
    return new UserInfosPageDto(userInfos.toDtos(), pageMetaDto);
  }

  createUserInfo(
    userInfoCreateDto: UserInfoCreateDto,
  ): Promise<UserInfoEntity> {
    const create: DeepPartial<UserInfoEntity> = {
      ...userInfoCreateDto,
    };
    if (userInfoCreateDto.userId) {
      create.user = { id: userInfoCreateDto.userId };
      delete (<any>create).userId;
    }
    if (userInfoCreateDto.melliCardScanBackId) {
      create.melliCardScanBack = { id: userInfoCreateDto.melliCardScanBackId };
      delete (<any>create).melliCardScanBackId;
    }
    if (userInfoCreateDto.melliCardScanFrontId) {
      create.melliCardScanFront = {
        id: userInfoCreateDto.melliCardScanFrontId,
      };
      delete (<any>create).melliCardScanFrontId;
    }
    if (userInfoCreateDto.payrollScanId) {
      create.payrollScan = { id: userInfoCreateDto.payrollScanId };
      delete (<any>create).payrollScanId;
    }

    const userInfo = this._userInfoRepository.create(create);
    return this._userInfoRepository.save(userInfo);
  }

  async deleteUserInfo(id: string): Promise<UserInfoDto> {
    const found = await this.findOne({ id });
    const userInfo = await this._userInfoRepository.delete(id);
    if (userInfo.affected === 0) {
      throw new NotFoundException();
    }
    return found.toDto();
  }

  async updateUserInfo(
    id: string,
    userInfoUpdateDto: UserInfoUpdateDto,
  ): Promise<UserInfoDto> {
    const update: DeepPartial<UserInfoEntity> = {
      ...userInfoUpdateDto,
    };
    if (userInfoUpdateDto.melliCardScanBackId) {
      update.melliCardScanBack = { id: userInfoUpdateDto.melliCardScanBackId };
      delete (<any>update).melliCardScanBackId;
    }
    if (userInfoUpdateDto.melliCardScanFrontId) {
      update.melliCardScanFront = {
        id: userInfoUpdateDto.melliCardScanFrontId,
      };
      delete (<any>update).melliCardScanFrontId;
    }
    if (userInfoUpdateDto.payrollScanId) {
      update.payrollScan = { id: userInfoUpdateDto.payrollScanId };
      delete (<any>update).payrollScanId;
    }

    const updated = await this._userInfoRepository.update(
      id,
      pickBy(update, identity),
    );
    if (updated.affected === 0) {
      throw new NotFoundException();
    }
    return (await this.findOne({ id })).toDto();
  }
}
