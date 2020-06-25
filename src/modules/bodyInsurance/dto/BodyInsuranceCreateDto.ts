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
  @IsString({ message: 'error.bii.bimeNumber.string' })
  @IsNotEmpty({ message: 'error.bii.bimeNumber.empty' })
  @ApiProperty()
  bimeNumber: string;

  @IsDate({ message: 'error.bii.startDate.date' })
  @Type(() => Date)
  @ApiProperty()
  startDate: string;

  @IsDate({ message: 'error.bii.endDate.date' })
  @Type(() => Date)
  @ApiProperty()
  endDate: string;

  @IsBoolean({ message: 'error.bii.isCash.boolean' })
  @ApiProperty()
  isCash: boolean;

  @IsNumber(undefined, { message: 'error.bii.fullAmount.number' })
  @Min(0, { message: 'error.bii.fullAmount.min' })
  @ApiProperty()
  fullAmount: number;

  @IsUUID('4', { message: 'error.bii.insurerId.uuidV4' })
  @ApiProperty()
  insurerId: string;

  @IsUUID('4', { message: 'error.bii.vehicleId.uuidV4' })
  @ApiProperty()
  vehicleId: string;

  @IsEnum(InsuranceType, { message: 'error.bii.insurance.enum' })
  @ApiProperty({ enum: InsuranceType })
  insurance: InsuranceType;

  @IsUUID('4', { message: 'error.bii.attachmentId.uuidV4' })
  @IsOptional()
  @ApiPropertyOptional()
  attachmentId: string;
}
