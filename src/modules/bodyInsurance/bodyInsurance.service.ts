import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { identity, pickBy } from 'lodash';
import {
  Between,
  DeepPartial,
  FindConditions,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
} from 'typeorm';

import { RoleType } from '../../common/constants/role-type';
import { PageMetaDto } from '../../common/dto/PageMetaDto';
import { UserEntity } from '../user/user.entity';
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
      relations: ['insurer', 'attachment', 'vehicle'],
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
    creator: UserEntity,
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
    if (bodyInsuranceCreateDto.attachmentId) {
      create.attachment = { id: bodyInsuranceCreateDto.attachmentId };
      delete (<any>create).attachmentId;
    }

    const bodyInsurance = this._bodyInsuranceRepository.create({
      ...create,
      creator,
    });
    return (await this._bodyInsuranceRepository.save(bodyInsurance)).toDto();
  }

  async deleteBodyInsurance(
    id: string,
    creator: UserEntity,
  ): Promise<BodyInsuranceDto> {
    const found = await this.findOne(id);
    if (found.creatorId !== creator.id || creator?.role !== RoleType.ADMIN) {
      throw new UnauthorizedException();
    }
    const bodyInsurance = await this._bodyInsuranceRepository.delete(id);
    if (bodyInsurance.affected === 0) {
      throw new NotFoundException();
    }
    return found.toDto();
  }

  async updateBodyInsurance(
    id: string,
    updatePlanDto: BodyInsuranceUpdateDto,
    creator: UserEntity,
  ): Promise<BodyInsuranceDto> {
    const found = await this.findOne(id);
    if (found.creatorId !== creator.id || creator?.role !== RoleType.ADMIN) {
      throw new UnauthorizedException();
    }

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
    if (updatePlanDto.attachmentId) {
      update.attachment = { id: updatePlanDto.attachmentId };
      delete (<any>update).attachmentId;
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

  async getStats() {
    return null;
  }
}
