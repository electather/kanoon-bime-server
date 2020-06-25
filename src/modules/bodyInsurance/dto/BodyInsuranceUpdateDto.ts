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

export class BodyInsuranceUpdateDto {
  @IsString({ message: 'error.bii.bimeNumber.string' })
  @IsNotEmpty({ message: 'error.bii.bimeNumber.empty' })
  @IsOptional()
  @ApiPropertyOptional()
  bimeNumber?: string;

  @IsDate({ message: 'error.bii.startDate.date' })
  @Type(() => Date)
  @IsOptional()
  @ApiPropertyOptional()
  startDate?: string;

  @IsDate({ message: 'error.bii.endDate.date' })
  @Type(() => Date)
  @IsOptional()
  @ApiPropertyOptional()
  endDate?: string;

  @IsBoolean({ message: 'error.bii.isCash.boolean' })
  @IsOptional()
  @ApiPropertyOptional()
  isCash?: boolean;

  @IsNumber(undefined, { message: 'error.bii.fullAmount.number' })
  @Min(0, { message: 'error.bii.fullAmount.min' })
  @IsOptional()
  @ApiPropertyOptional()
  fullAmount?: number;

  @IsUUID('4', { message: 'error.bii.insurerId.uuidV4' })
  @IsOptional()
  @ApiPropertyOptional()
  insurerId?: string;

  @IsUUID('4', { message: 'error.bii.vehicleId.uuidV4' })
  @IsOptional()
  @ApiPropertyOptional()
  vehicleId?: string;

  @IsEnum(InsuranceType, { message: 'error.bii.insurance.enum' })
  @IsOptional()
  @ApiPropertyOptional({ enum: InsuranceType })
  insurance?: InsuranceType;

  @IsUUID('4', { message: 'error.bii.attachmentId.uuidV4' })
  @IsOptional()
  @ApiPropertyOptional()
  attachmentId?: string;
}
