import { Injectable, NotFoundException } from '@nestjs/common';
import { identity, pickBy } from 'lodash';
import { DeepPartial, FindConditions, Like } from 'typeorm';

import { PageMetaDto } from '../../common/dto/PageMetaDto';
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
  async findOne(id: string): Promise<VehicleEntity> {
    const vehicle = await this._vehicleRepository.findOne(id, {
      relations: ['issuer'],
    });
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
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: vehiclesCount,
    });
    return new VehiclesPageDto(vehicles.toDtos(), pageMetaDto);
  }

  async createVehicle(vehicleCreateDto: VehicleCreateDto): Promise<VehicleDto> {
    const create: DeepPartial<VehicleEntity> = {
      ...vehicleCreateDto,
    };
    if (vehicleCreateDto.issuerId) {
      create.insurer = { id: vehicleCreateDto.issuerId };
      delete (<any>create).fromId;
    }
    const vehicle = this._vehicleRepository.create(create);
    return (await this._vehicleRepository.save(vehicle)).toDto();
  }

  async deleteVehicle(id: string): Promise<VehicleDto> {
    const found = await this.findOne(id);
    const vehicle = await this._vehicleRepository.delete(id);
    if (vehicle.affected === 0) {
      throw new NotFoundException();
    }
    return found.toDto();
  }

  async updateVehicle(
    id: string,
    updatePlanDto: VehicleUpdateDto,
  ): Promise<VehicleDto> {
    const update: DeepPartial<VehicleEntity> = {
      ...updatePlanDto,
    };
    if (updatePlanDto.insurerId) {
      update.insurer = { id: updatePlanDto.insurerId };
      delete (<any>update).fromId;
    }

    const updated = await this._vehicleRepository.update(
      id,
      pickBy(update, identity),
    );
    if (updated.affected === 0) {
      throw new NotFoundException();
    }
    return (await this.findOne(id)).toDto();
  }
}
