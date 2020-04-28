/* eslint-disable import/no-unresolved */
'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { UserDto } from '../../user/dto/UserDto';
import { VehicleDto } from '../../vehicle/dto/VehicleDto';
import { BodyInsuranceEntity } from '../bodyInsurance.entity';

export class BodyInsuranceDto extends AbstractDto {
  @ApiPropertyOptional()
  bimeNumber: string;

  @ApiPropertyOptional()
  startDate: Date;

  @ApiPropertyOptional()
  endDate: Date;

  @ApiPropertyOptional()
  isCash: boolean;

  @ApiPropertyOptional()
  fullAmount: number;

  @ApiPropertyOptional({ type: () => UserDto })
  insurer: UserDto;

  @ApiPropertyOptional({ type: () => VehicleDto })
  vehicle: VehicleDto;

  constructor(entity: BodyInsuranceEntity) {
    super(entity);
    this.bimeNumber = entity.bimeNumber;
    this.startDate = entity.startDate;
    this.endDate = entity.endDate;
    this.isCash = entity.isCash;
    this.fullAmount = entity.fullAmount;
    this.insurer = entity.insurer?.toDto();
    this.vehicle = entity.vehicle?.toDto();
  }
}
