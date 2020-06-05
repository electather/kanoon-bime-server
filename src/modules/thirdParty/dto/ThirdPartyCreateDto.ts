'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

import { InsuranceType } from '../../../common/constants/insurance-type';

export class ThirdPartyCreateDto {
  @IsString({ message: 'error.must-be-string' })
  @IsNotEmpty({ message: 'error.empty' })
  @ApiProperty()
  bimeNumber: string;

  @IsDate({ message: 'error.must-be-date' })
  @Type(() => Date)
  @ApiProperty()
  startDate: string;

  @IsDate({ message: 'error.must-be-date' })
  @Type(() => Date)
  @ApiProperty()
  endDate: string;

  @IsBoolean({ message: 'error.must-be-boolean' })
  @ApiProperty()
  isCash: boolean;

  @IsNumber({}, { message: 'error.must-be-number' })
  @Min(0)
  @ApiProperty()
  fullAmount: number;

  @IsString({ message: 'error.must-be-string' })
  @IsUUID('4', { message: 'error.must-be-uuid' })
  @ApiProperty()
  insurerId: string;

  @IsString({ message: 'error.must-be-string' })
  @IsUUID('4')
  @ApiProperty()
  vehicleId: string;

  @IsEnum(InsuranceType, { message: 'error.must-be-enum' })
  @ApiProperty({ enum: InsuranceType })
  insurance: InsuranceType;

  @IsString({ message: 'error.must-be-string' })
  @IsUUID('4', { message: 'error.must-be-uuid' })
  @ApiProperty()
  attachmentId: string;
}
