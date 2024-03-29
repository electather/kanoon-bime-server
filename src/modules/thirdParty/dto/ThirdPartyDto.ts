/* eslint-disable import/no-unresolved */
'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { InsuranceType } from '../../../common/constants/insurance-type';
import { AbstractDto } from '../../../common/dto/AbstractDto';
import { FileDto } from '../../../modules/files/dto/FileDto';
import { UserDto } from '../../user/dto/UserDto';
import { VehicleDto } from '../../vehicle/dto/VehicleDto';
import { ThirdPartyEntity } from '../thirdParty.entity';

export class ThirdPartyDto extends AbstractDto {
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

  @ApiPropertyOptional({ type: () => UserDto })
  creator?: UserDto;

  @ApiPropertyOptional({ type: () => VehicleDto })
  vehicle: VehicleDto;

  @ApiPropertyOptional({ enum: InsuranceType })
  insurance: InsuranceType;

  @ApiPropertyOptional({ type: () => FileDto })
  attachment?: FileDto;

  constructor(entity: ThirdPartyEntity) {
    super(entity);
    this.bimeNumber = entity.bimeNumber;
    this.startDate = entity.startDate;
    this.endDate = entity.endDate;
    this.isCash = entity.isCash;
    this.fullAmount = entity.fullAmount;
    this.insurer = entity.insurer?.toDto();
    this.vehicle = entity.vehicle?.toDto();
    this.insurance = entity.insurance;
    this.attachment = entity.attachment?.toDto();
    this.creator = entity.creator?.toDto();
  }
}
