'use strict';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

import { InsuranceType } from '../../../common/constants/insurance-type';

export class ThirdPartyCreateDto {
  @IsString({ message: 'error.tpi.bimeNumber.string' })
  @IsNotEmpty({ message: 'error.tpi.bimeNumber.empty' })
  @ApiProperty()
  bimeNumber: string;

  @IsDate({ message: 'error.tpi.startDate.date' })
  @Type(() => Date)
  @ApiProperty()
  startDate: string;

  @IsDate({ message: 'error.tpi.endDate.date' })
  @Type(() => Date)
  @ApiProperty()
  endDate: string;

  @IsBoolean({ message: 'error.tpi.isCash.boolean' })
  @ApiProperty()
  isCash: boolean;

  @IsNumber(undefined, { message: 'error.tpi.fullAmount.number' })
  @Min(0, { message: 'error.tpi.fullAmount.min' })
  @ApiProperty()
  fullAmount: number;

  @IsUUID('4', { message: 'error.tpi.insurerId.uuidV4' })
  @ApiProperty()
  insurerId: string;

  @IsUUID('4', { message: 'error.tpi.vehicleId.uuidV4' })
  @ApiProperty()
  vehicleId: string;

  @IsEnum(InsuranceType, { message: 'error.tpi.insurance.enum' })
  @ApiProperty({ enum: InsuranceType })
  insurance: InsuranceType;

  @IsUUID('4', { message: 'error.tpi.attachmentId.uuidV4' })
  @IsOptional()
  @ApiPropertyOptional()
  attachmentId: string;
}
