'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';
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

export class ThirdPartyUpdateDto {
  @IsString({ message: 'error.tpi.bimeNumber.string' })
  @IsNotEmpty({ message: 'error.tpi.bimeNumber.empty' })
  @IsOptional()
  @ApiPropertyOptional()
  bimeNumber: string;

  @IsDate({ message: 'error.tpi.startDate.date' })
  @Type(() => Date)
  @IsOptional()
  @ApiPropertyOptional()
  startDate: string;

  @IsDate({ message: 'error.tpi.endDate.date' })
  @Type(() => Date)
  @IsOptional()
  @ApiPropertyOptional()
  endDate: string;

  @IsBoolean({ message: 'error.tpi.isCash.boolean' })
  @IsOptional()
  @ApiPropertyOptional()
  isCash: boolean;

  @IsNumber(undefined, { message: 'error.tpi.fullAmount.number' })
  @Min(0, { message: 'error.tpi.fullAmount.min' })
  @IsOptional()
  @ApiPropertyOptional()
  fullAmount: number;

  @IsUUID('4', { message: 'error.tpi.insurerId.uuidV4' })
  @IsOptional()
  @ApiPropertyOptional()
  insurerId: string;

  @IsUUID('4', { message: 'error.tpi.vehicleId.uuidV4' })
  @IsOptional()
  @ApiPropertyOptional()
  vehicleId: string;

  @IsEnum(InsuranceType, { message: 'error.tpi.insurance.enum' })
  @IsOptional()
  @ApiPropertyOptional({ enum: InsuranceType })
  insurance?: InsuranceType;

  @IsUUID('4', { message: 'error.tpi.attachmentId.uuidV4' })
  @IsOptional()
  @ApiPropertyOptional()
  attachmentId?: string;
}
