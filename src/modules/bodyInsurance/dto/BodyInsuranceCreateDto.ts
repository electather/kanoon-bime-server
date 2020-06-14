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

export class BodyInsuranceCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  bimeNumber: string;

  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  startDate: string;

  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  endDate: string;

  @IsBoolean()
  @ApiProperty()
  isCash: boolean;

  @IsNumber()
  @Min(0)
  @ApiProperty()
  fullAmount: number;

  @IsString()
  @IsUUID('4')
  @ApiProperty()
  insurerId: string;

  @IsString()
  @IsUUID('4')
  @ApiProperty()
  vehicleId: string;

  @IsEnum(InsuranceType)
  @ApiProperty({ enum: InsuranceType })
  insurance: InsuranceType;

  @IsString()
  @IsUUID('4')
  @IsOptional()
  @ApiPropertyOptional()
  attachmentId: string;
}
