'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class ThirdPartyCreateDto {
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
}
