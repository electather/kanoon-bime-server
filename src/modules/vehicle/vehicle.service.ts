import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { identity, pickBy } from 'lodash';
import { DeepPartial, FindConditions, FindOneOptions, Like } from 'typeorm';

import { RoleType } from '../../common/constants/role-type';
import { PageMetaDto } from '../../common/dto/PageMetaDto';
import { UserEntity } from '../user/user.entity';
import { VehicleCreateDto } from './dto/VehicleCreateDto';
import { VehicleDto } from './dto/VehicleDto';
import { VehiclesPageDto } from './dto/VehiclePageDto';
import { VehiclesPageOptionsDto } from './dto/VehiclePageOptionsDto';
import { VehicleUpdateDto } from './dto/VehicleUpdateDto';
import { VehicleEntity } from './vehicle.entity';
import { VehicleRepository } from './vehicle.repository';

@Injectable()
export class VehicleService {
  constructor(private readonly _vehicleRepository: VehicleRepository) {}

  /**
   * Find single vehicle
   */
  async findOne(
    findData: FindConditions<VehicleEntity>,
    options?: FindOneOptions<VehicleEntity>,
  ): Promise<VehicleEntity> {
    const vehicle = await this._vehicleRepository.findOne(findData, options);
    if (!vehicle) {
      throw new NotFoundException();
    }
    return vehicle;
  }

  async getVehicles(
    pageOptionsDto: VehiclesPageOptionsDto,
  ): Promise<VehiclesPageDto> {
    const where: FindConditions<VehicleEntity> = {};
    if (pageOptionsDto.q) {
      where.ownerLastName = Like(`%${pageOptionsDto.q}%`);
    }
    if (pageOptionsDto.engineNumber) {
      where.engineNumber = Like(`%${pageOptionsDto.engineNumber}%`);
    }
    const [
      vehicles,
      vehiclesCount,
    ] = await this._vehicleRepository.findAndCount({
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
      itemCount: vehiclesCount,
    });
    return new VehiclesPageDto(vehicles.toDtos(), pageMetaDto);
  }

  async createVehicle(
    createDto: VehicleCreateDto,
    creator?: UserEntity,
  ): Promise<VehicleEntity> {
    const create: DeepPartial<VehicleEntity> = {
      ...createDto,
    };
    if (createDto.issuerId) {
      create.insurer = { id: createDto.issuerId };
      delete (<any>create).fromId;
    }
    if (createDto.attachmentId) {
      create.attachment = { id: createDto.attachmentId };
      delete (<any>create).attachmentId;
    }
    const vehicle = this._vehicleRepository.create({ ...create, creator });
    return this._vehicleRepository.save(vehicle);
  }

  async deleteVehicle(id: string, creator: UserEntity): Promise<VehicleDto> {
    const found = await this.findOne({ id });
    if (found.creatorId !== creator.id || creator?.role !== RoleType.ADMIN) {
      throw new UnauthorizedException();
    }
    const vehicle = await this._vehicleRepository.delete(id);
    if (vehicle.affected === 0) {
      throw new NotFoundException();
    }
    return found.toDto();
  }

  async updateVehicle(
    id: string,
    updatePlanDto: VehicleUpdateDto,
    creator: UserEntity,
  ): Promise<VehicleDto> {
    const found = await this.findOne({ id });
    if (found.creatorId !== creator.id || creator?.role !== RoleType.ADMIN) {
      throw new UnauthorizedException();
    }
    const update: DeepPartial<VehicleEntity> = {
      ...updatePlanDto,
    };
    if (updatePlanDto.insurerId) {
      update.insurer = { id: updatePlanDto.insurerId };
      delete (<any>update).fromId;
    }
    if (updatePlanDto.attachmentId) {
      update.attachment = { id: updatePlanDto.attachmentId };
      delete (<any>update).attachmentId;
    }
    const updated = await this._vehicleRepository.update(
      id,
      pickBy(update, identity),
    );
    if (updated.affected === 0) {
      throw new NotFoundException();
    }
    return (await this.findOne({ id })).toDto();
  }
}
