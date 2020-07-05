import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { identity, pickBy } from 'lodash';
import {
  Between,
  DeepPartial,
  Equal,
  FindConditions,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
} from 'typeorm';

import { RoleType } from '../../common/constants/role-type';
import { OwnerShipChangeDto } from '../../common/dto/OwnerShipChangeDto';
import { PageMetaDto } from '../../common/dto/PageMetaDto';
import { UserEntity } from '../user/user.entity';
import { BodyInsuranceEntity } from './bodyInsurance.entity';
import { BodyInsuranceRepository } from './bodyInsurance.repository';
import { BodyInsuranceCreateDto } from './dto/BodyInsuranceCreateDto';
import { BodyInsuranceDailyStatDto } from './dto/BodyInsuranceDailyStatDto';
import { BodyInsuranceDto } from './dto/BodyInsuranceDto';
import { BodyInsurancePageDto } from './dto/BodyInsurancePageDto';
import { BodyInsurancePageOptionsDto } from './dto/BodyInsurancePageOptionsDto';
import { BodyInsuranceStatOptionsDto } from './dto/BodyInsuranceStatOptionsDto';
import { BodyInsuranceTotalStatDto } from './dto/BodyInsuranceTotalStatDto';
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
    creator: UserEntity,
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
    if (creator.role === RoleType.KARSHENAS) {
      where.creatorId = Equal(creator.id);
    }
    const [
      bodyInsurance,
      bodyInsuranceCount,
    ] = await this._bodyInsuranceRepository.findAndCount({
      where,
      take: pageOptionsDto.take,
      skip: pageOptionsDto.skip,
      order: {
        endDate: pageOptionsDto.order,
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

  async getDailyStats(options: BodyInsuranceStatOptionsDto, user: UserEntity) {
    const qb = this._bodyInsuranceRepository
      .createQueryBuilder('bii')
      .select('SUM(bii.full_amount)', 'totalValue')
      .addSelect('COUNT(*)', 'count')
      .addSelect('bii.start_date::date', 'day')
      .groupBy('bii.start_date::date')
      .orderBy('bii.start_date::date');
    if (user.role !== RoleType.ADMIN) {
      qb.where('bii.creator_id = :id', {
        id: user.id,
      });
    } else if (options.userId) {
      qb.where('bii.creator_id = :id', {
        id: options.userId,
      });
    }
    const rawResult = await qb.getRawMany();
    return new BodyInsuranceDailyStatDto(rawResult);
  }

  async getTotalStats(options: BodyInsuranceStatOptionsDto, user: UserEntity) {
    const qb = this._bodyInsuranceRepository
      .createQueryBuilder('bii')
      .select('SUM(bii.full_amount)', 'totalValue')
      .addSelect('COUNT(*)', 'count');
    if (user.role !== RoleType.ADMIN) {
      qb.where('bii.creator_id = :id', {
        id: user.id,
      });
    } else if (options.userId) {
      qb.where('bii.creator_id = :id', {
        id: options.userId,
      });
    }
    const { totalValue, count } = await qb.getRawOne();
    return new BodyInsuranceTotalStatDto(
      Number(totalValue),
      Number(count),
      options.startDateMin,
      options.startDateMax,
    );
  }

  async changeOwnership({ nextOwner, pervOwner }: OwnerShipChangeDto) {
    const res = await this._bodyInsuranceRepository.update(
      { creatorId: Equal(pervOwner) },
      { creator: { id: nextOwner } },
    );
    return {
      effected: res.affected ?? 0,
    };
  }
}
