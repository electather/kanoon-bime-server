import { Injectable, NotFoundException } from '@nestjs/common';
import { identity, pickBy } from 'lodash';
import {
  Between,
  DeepPartial,
  FindConditions,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
} from 'typeorm';

import { PageMetaDto } from '../../common/dto/PageMetaDto';
import { ThirdPartyCreateDto } from './dto/ThirdPartyCreateDto';
import { ThirdPartyDto } from './dto/ThirdPartyDto';
import { ThirdPartyPageDto } from './dto/ThirdPartyPageDto';
import { ThirdPartyPageOptionsDto } from './dto/ThirdPartyPageOptionsDto';
import { ThirdPartyUpdateDto } from './dto/ThirdPartyUpdateDto';
import { ThirdPartyEntity } from './thirdParty.entity';
import { ThirdPartyRepository } from './thirdParty.repository';

@Injectable()
export class ThirdPartyService {
  constructor(private readonly _thirdPartyRepository: ThirdPartyRepository) {}

  /**
   * Find single thirdParty
   */
  async findOne(id: string): Promise<ThirdPartyEntity> {
    const thirdParty = await this._thirdPartyRepository.findOne(id);
    if (!thirdParty) {
      throw new NotFoundException();
    }
    return thirdParty;
  }

  async getList(
    pageOptionsDto: ThirdPartyPageOptionsDto,
  ): Promise<ThirdPartyPageDto> {
    const where: FindConditions<ThirdPartyEntity> = {};
    if (pageOptionsDto.bimeNumber) {
      where.bimeNumber = Like(`%${pageOptionsDto.bimeNumber}%`);
    }
    if (pageOptionsDto.creationDateMin && !pageOptionsDto.creationDateMax) {
      where.startDate = MoreThanOrEqual(pageOptionsDto.creationDateMin);
    } else if (
      !pageOptionsDto.creationDateMin &&
      pageOptionsDto.creationDateMax
    ) {
      where.startDate = LessThanOrEqual(pageOptionsDto.creationDateMax);
    } else if (
      pageOptionsDto.creationDateMin &&
      pageOptionsDto.creationDateMax
    ) {
      where.startDate = Between(
        pageOptionsDto.creationDateMin,
        pageOptionsDto.creationDateMax,
      );
    }
    if (pageOptionsDto.expiryDateMin && !pageOptionsDto.expiryDateMax) {
      where.endDate = MoreThanOrEqual(pageOptionsDto.expiryDateMin);
    } else if (!pageOptionsDto.expiryDateMin && pageOptionsDto.expiryDateMax) {
      where.endDate = LessThanOrEqual(pageOptionsDto.expiryDateMax);
    } else if (pageOptionsDto.expiryDateMin && pageOptionsDto.expiryDateMax) {
      where.endDate = Between(
        pageOptionsDto.expiryDateMin,
        pageOptionsDto.expiryDateMax,
      );
    }
    const [
      thirdParty,
      thirdPartyCount,
    ] = await this._thirdPartyRepository.findAndCount({
      where,
      take: pageOptionsDto.take,
      skip: pageOptionsDto.skip,
      order: {
        createdAt: pageOptionsDto.order,
      },
      relations: ['insurer'],
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: thirdPartyCount,
    });
    return new ThirdPartyPageDto(thirdParty.toDtos(), pageMetaDto);
  }

  async createThirdParty(
    createDto: ThirdPartyCreateDto,
  ): Promise<ThirdPartyDto> {
    const create: DeepPartial<ThirdPartyEntity> = {
      ...createDto,
    };
    if (createDto.insurerId) {
      create.insurer = { id: createDto.insurerId };
      delete (<any>create).fromId;
    }
    if (createDto.vehicleId) {
      create.vehicle = { id: createDto.vehicleId };
      delete (<any>create).fromId;
    }
    if (createDto.attachmentId) {
      create.attachment = { id: createDto.attachmentId };
      delete (<any>create).attachmentId;
    }

    const thirdParty = this._thirdPartyRepository.create(create);
    return (await this._thirdPartyRepository.save(thirdParty)).toDto();
  }

  async deleteThirdParty(id: string): Promise<ThirdPartyDto> {
    const found = await this.findOne(id);
    const thirdParty = await this._thirdPartyRepository.delete(id);
    if (thirdParty.affected === 0) {
      throw new NotFoundException();
    }
    return found.toDto();
  }

  async updateThirdParty(
    id: string,
    updatePlanDto: ThirdPartyUpdateDto,
  ): Promise<ThirdPartyDto> {
    const update: DeepPartial<ThirdPartyEntity> = {
      ...updatePlanDto,
    };
    if (updatePlanDto.insurerId) {
      update.insurer = { id: updatePlanDto.insurerId };
      delete (<any>update).fromId;
    }
    if (updatePlanDto.vehicleId) {
      update.vehicle = { id: updatePlanDto.vehicleId };
      delete (<any>update).fromId;
    }
    if (updatePlanDto.attachmentId) {
      update.attachment = { id: updatePlanDto.attachmentId };
      delete (<any>update).attachmentId;
    }

    const updated = await this._thirdPartyRepository.update(
      id,
      pickBy(update, identity),
    );
    if (updated.affected === 0) {
      throw new NotFoundException();
    }
    return (await this.findOne(id)).toDto();
  }
}
