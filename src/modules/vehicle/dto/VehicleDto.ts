/* eslint-disable import/no-unresolved */
'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { UserDto } from '../../user/dto/UserDto';
import { VehicleEntity } from '../vehicle.entity';

export class VehicleDto extends AbstractDto {
  @ApiPropertyOptional({ type: () => UserDto })
  insurer: UserDto;

  @ApiPropertyOptional()
  ownerName: string;

  @ApiPropertyOptional()
  ownerLastName: string;

  @ApiPropertyOptional()
  address?: string;

  @ApiPropertyOptional()
  engineNumber: string;

  @ApiPropertyOptional()
  chassisNumber: string;

  @ApiPropertyOptional()
  plateFirstTwoNumbers?: string;

  @ApiPropertyOptional()
  plateLetter?: string;

  @ApiPropertyOptional()
  plateLastThreeNumbers?: string;

  @ApiPropertyOptional()
  plateIRNumber?: string;

  constructor(vehicle: VehicleEntity) {
    super(vehicle);
    this.insurer = vehicle.insurer?.toDto();
    this.ownerName = vehicle.ownerName;
    this.ownerLastName = vehicle.ownerLastName;
    this.address = vehicle.address;
    this.engineNumber = vehicle.engineNumber;
    this.chassisNumber = vehicle.chassisNumber;
    this.plateFirstTwoNumbers = vehicle.plateFirstTwoNumbers;
    this.plateLetter = vehicle.plateLetter;
    this.plateLastThreeNumbers = vehicle.plateLastThreeNumbers;
    this.plateIRNumber = vehicle.plateIRNumber;
  }
}
