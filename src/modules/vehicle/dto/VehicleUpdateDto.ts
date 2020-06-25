'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
} from 'class-validator';

export class VehicleUpdateDto {
  @IsString({ message: 'error.vehicle.issuer.string' })
  @IsUUID('4', { message: 'error.vehicle.issuer.uuidV4' })
  @IsOptional()
  @ApiPropertyOptional()
  insurerId: string;

  @IsString({ message: 'error.vehicle.ownerName.string' })
  @IsNotEmpty({ message: 'error.vehicle.ownerName.empty' })
  @IsOptional()
  @ApiPropertyOptional()
  ownerName: string;

  @IsString({ message: 'error.vehicle.ownerLastName.string' })
  @IsNotEmpty({ message: 'error.vehicle.ownerLastName.empty' })
  @IsOptional()
  @ApiPropertyOptional()
  ownerLastName: string;

  @IsString({ message: 'error.vehicle.address.string' })
  @IsNotEmpty({ message: 'error.vehicle.address.empty' })
  @IsOptional()
  @ApiPropertyOptional()
  address: string;

  @IsString({ message: 'error.vehicle.engineNumber.string' })
  @Length(4, 20, { message: 'error.vehicle.engineNumber.length' })
  @IsOptional()
  @ApiPropertyOptional()
  engineNumber: string;

  @IsString({ message: 'error.vehicle.chassisNumber.string' })
  @Length(4, 20, { message: 'error.vehicle.chassisNumber.length' })
  @IsOptional()
  @ApiPropertyOptional()
  chassisNumber: string;

  @IsNumber(undefined, { message: 'error.vehicle.plateFirstTwoNumbers.string' })
  @Min(10, { message: 'error.vehicle.plateFirstTwoNumbers.length' })
  @Max(99, { message: 'error.vehicle.plateFirstTwoNumbers.length' })
  @IsOptional()
  @ApiPropertyOptional()
  plateFirstTwoNumbers: number;

  @IsNumber(undefined, { message: 'error.vehicle.plateLetter.string' })
  @Min(1, { message: 'error.vehicle.plateLetter.length' })
  @Max(31, { message: 'error.vehicle.plateLetter.length' })
  @IsOptional()
  @ApiPropertyOptional()
  plateLetter: number;

  @IsNumber(undefined, {
    message: 'error.vehicle.plateLastThreeNumbers.string',
  })
  @Min(100, { message: 'error.vehicle.plateLastThreeNumbers.length' })
  @Max(999, { message: 'error.vehicle.plateLastThreeNumbers.length' })
  @IsOptional()
  @ApiPropertyOptional()
  plateLastThreeNumbers: number;

  @IsNumber(undefined, {
    message: 'error.vehicle.plateIRNumber.string',
  })
  @Min(0, { message: 'error.vehicle.plateIRNumber.length' })
  @Max(99, { message: 'error.vehicle.plateIRNumber.length' })
  @IsOptional()
  @ApiPropertyOptional()
  plateIRNumber: number;

  @IsString({ message: 'error.vehicle.attachmentId.string' })
  @IsUUID('4', { message: 'error.vehicle.attachmentId.uuidV4' })
  @ApiPropertyOptional()
  attachmentId: string;
}
