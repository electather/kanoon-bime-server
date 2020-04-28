import { Injectable, NotFoundException } from '@nestjs/common';
import { identity, pickBy } from 'lodash';
import { DeepPartial, FindConditions } from 'typeorm';

import { PageMetaDto } from '../../common/dto/PageMetaDto';
import { BodyInsuranceEntity } from './bodyInsurance.entity';
import { BodyInsuranceRepository } from './bodyInsurance.repository';
import { BodyInsuranceCreateDto } from './dto/BodyInsuranceCreateDto';
import { BodyInsuranceDto } from './dto/BodyInsuranceDto';
import { BodyInsurancePageDto } from './dto/BodyInsurancePageDto';
import { BodyInsurancePageOptionsDto } from './dto/BodyInsurancePageOptionsDto';
import { BodyInsuranceUpdateDto } from './dto/BodyInsuranceUpdateDto';

@Injectable()
export class BodyInsuranceService {
  constructor(
    private readonly _bodyInsuranceRepository: BodyInsuranceRepository,
  ) {}

  /**
   * Find single bodyInsurance
   */
  async findOne(id: string): Promise<BodyInsuranceEntity> {
    const bodyInsurance = await this._bodyInsuranceRepository.findOne(id, {
      relations: ['issuer'],
    });
    if (!bodyInsurance) {
      throw new NotFoundException();
    }
    return bodyInsurance;
  }

  async getList(
    pageOptionsDto: BodyInsurancePageOptionsDto,
  ): Promise<BodyInsurancePageDto> {
    const where: FindConditions<BodyInsuranceEntity> = {};
    const [
      bodyInsurance,
      bodyInsuranceCount,
    ] = await this._bodyInsuranceRepository.findAndCount({
      where,
      take: pageOptionsDto.take,
      skip: pageOptionsDto.skip,
      order: {
        createdAt: pageOptionsDto.order,
      },
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: bodyInsuranceCount,
    });
    return new BodyInsurancePageDto(bodyInsurance.toDtos(), pageMetaDto);
  }

  async createBodyInsurance(
    bodyInsuranceCreateDto: BodyInsuranceCreateDto,
  ): Promise<BodyInsuranceDto> {
    const create: DeepPartial<BodyInsuranceEntity> = {
      ...bodyInsuranceCreateDto,
    };
    if (bodyInsuranceCreateDto.insurerId) {
      create.insurer = { id: bodyInsuranceCreateDto.insurerId };
      delete (<any>create).fromId;
    }
    if (bodyInsuranceCreateDto.vehicleId) {
      create.vehicle = { id: bodyInsuranceCreateDto.vehicleId };
      delete (<any>create).fromId;
    }

    const bodyInsurance = this._bodyInsuranceRepository.create(create);
    return (await this._bodyInsuranceRepository.save(bodyInsurance)).toDto();
  }

  async deleteBodyInsurance(id: string): Promise<BodyInsuranceDto> {
    const found = await this.findOne(id);
    const bodyInsurance = await this._bodyInsuranceRepository.delete(id);
    if (bodyInsurance.affected === 0) {
      throw new NotFoundException();
    }
    return found.toDto();
  }

  async updateBodyInsurance(
    id: string,
    updatePlanDto: BodyInsuranceUpdateDto,
  ): Promise<BodyInsuranceDto> {
    const update: DeepPartial<BodyInsuranceEntity> = {
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
    const updated = await this._bodyInsuranceRepository.update(
      id,
      pickBy(update, identity),
    );
    if (updated.affected === 0) {
      throw new NotFoundException();
    }
    return (await this.findOne(id)).toDto();
  }
}
