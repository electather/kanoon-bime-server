/* eslint-disable import/no-unresolved */
'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { BodyInsuranceDto } from '../../bodyInsurance/dto/BodyInsuranceDto';
import { FileDto } from '../../files/dto/FileDto';
import { ThirdPartyDto } from '../../thirdParty/dto/ThirdPartyDto';
import { UserDto } from '../../user/dto/UserDto';
import { VehicleEntity } from '../vehicle.entity';

export class VehicleDto extends AbstractDto {
  @ApiPropertyOptional({ type: () => UserDto })
  insurer: UserDto;

  @ApiPropertyOptional()
  insurerId?: string;

  @ApiPropertyOptional({ type: () => UserDto })
  creator?: UserDto;

  @ApiPropertyOptional()
  creatorId?: string;

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
  plateFirstTwoNumbers?: number;

  @ApiPropertyOptional()
  plateLetter?: number;

  @ApiPropertyOptional()
  plateLastThreeNumbers?: number;

  @ApiPropertyOptional()
  plateIRNumber?: number;

  @ApiPropertyOptional({ type: () => FileDto })
  attachment?: FileDto;

  @ApiPropertyOptional({ type: () => BodyInsuranceDto, isArray: true })
  bodyInsurance?: BodyInsuranceDto[];

  @ApiPropertyOptional({ type: () => ThirdPartyDto, isArray: true })
  tpi?: ThirdPartyDto[];

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
    this.insurerId = vehicle.insurerId;
    this.creator = vehicle.creator?.toDto();
    this.creatorId = vehicle.creatorId;
    this.tpi = vehicle.tpi?.toDtos();
    this.bodyInsurance = vehicle.bodyInsurance?.toDtos();
  }
}
