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
import { ThirdPartyCreateDto } from './dto/ThirdPartyCreateDto';
import { ThirdPartyDailyStatDto } from './dto/ThirdPartyDailyStatDto';
import { ThirdPartyDto } from './dto/ThirdPartyDto';
import { ThirdPartyPageDto } from './dto/ThirdPartyPageDto';
import { ThirdPartyPageOptionsDto } from './dto/ThirdPartyPageOptionsDto';
import { ThirdPartyStatOptionsDto } from './dto/ThirdPartyStatOptionsDto';
import { ThirdPartyTotalStatDto } from './dto/ThirdPartyTotalStatDto';
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
    const thirdParty = await this._thirdPartyRepository.findOne(id, {
      relations: ['insurer', 'attachment', 'vehicle'],
    });
    if (!thirdParty) {
      throw new NotFoundException();
    }
    return thirdParty;
  }

  async getList(
    pageOptionsDto: ThirdPartyPageOptionsDto,
    creator: UserEntity,
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
    if (creator.role === RoleType.KARSHENAS) {
      where.creatorId = Equal(creator.id);
    }

    const [
      thirdParty,
      thirdPartyCount,
    ] = await this._thirdPartyRepository.findAndCount({
      where,
      take: pageOptionsDto.take,
      skip: pageOptionsDto.skip,
      order: {
        endDate: pageOptionsDto.order,
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
    creator: UserEntity,
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

    const thirdParty = this._thirdPartyRepository.create({
      ...create,
      creator,
    });
    return (await this._thirdPartyRepository.save(thirdParty)).toDto();
  }

  async deleteThirdParty(
    id: string,
    creator: UserEntity,
  ): Promise<ThirdPartyDto> {
    const found = await this.findOne(id);
    if (found.creatorId !== creator.id || creator?.role !== RoleType.ADMIN) {
      throw new UnauthorizedException();
    }
    const thirdParty = await this._thirdPartyRepository.delete(id);
    if (thirdParty.affected === 0) {
      throw new NotFoundException();
    }
    return found.toDto();
  }

  async updateThirdParty(
    id: string,
    updatePlanDto: ThirdPartyUpdateDto,
    creator: UserEntity,
  ): Promise<ThirdPartyDto> {
    const found = await this.findOne(id);
    if (found.creatorId !== creator.id || creator?.role !== RoleType.ADMIN) {
      throw new UnauthorizedException();
    }

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

  async getDailyStats(options: ThirdPartyStatOptionsDto, user: UserEntity) {
    const qb = this._thirdPartyRepository
      .createQueryBuilder('tpi')
      .select('SUM(tpi.full_amount)', 'totalValue')
      .addSelect('COUNT(*)', 'count')
      .addSelect('tpi.start_date::date', 'day')
      .groupBy('tpi.start_date::date')
      .orderBy('tpi.start_date::date')
      .where('tpi.full_amount > :min', {
        min: 0,
      });
    if (user.role !== RoleType.ADMIN) {
      qb.andWhere('tpi.creator_id = :id', {
        id: user.id,
      });
    } else if (options.userId) {
      qb.andWhere('tpi.creator_id = :id', {
        id: options.userId,
      });
    }
    if (options.startDateMin) {
      qb.andWhere('tpi.start_date >= :date', {
        date: options.startDateMin,
      });
    }
    if (options.startDateMax) {
      qb.andWhere('tpi.start_date <= :date', {
        date: options.startDateMin,
      });
    }
    const rawResult = await qb.getRawMany();
    return new ThirdPartyDailyStatDto(rawResult);
  }

  async getTotalStats(options: ThirdPartyStatOptionsDto, user: UserEntity) {
    const qb = this._thirdPartyRepository
      .createQueryBuilder('tpi')
      .select('SUM(tpi.full_amount)', 'totalValue')
      .addSelect('COUNT(*)', 'count')
      .where('tpi.full_amount > 0');
    if (user.role !== RoleType.ADMIN) {
      qb.andWhere('tpi.creator_id = :id', {
        id: user.id,
      });
    } else if (options.userId) {
      qb.andWhere('tpi.creator_id = :id', {
        id: options.userId,
      });
    }
    if (options.startDateMin) {
      qb.andWhere('tpi.start_date >= :date', {
        date: options.startDateMin,
      });
    }
    if (options.startDateMax) {
      qb.andWhere('tpi.start_date <= :date', {
        date: options.startDateMin,
      });
    }

    const { totalValue, count } = await qb.getRawOne();
    return new ThirdPartyTotalStatDto(
      Number(totalValue),
      Number(count),
      options.startDateMin,
      options.startDateMax,
    );
  }

  async changeOwnership({ nextOwner, pervOwner }: OwnerShipChangeDto) {
    const res = await this._thirdPartyRepository.update(
      { creatorId: Equal(pervOwner) },
      { creator: { id: nextOwner } },
    );
    return {
      effected: res.affected ?? 0,
    };
  }
}
