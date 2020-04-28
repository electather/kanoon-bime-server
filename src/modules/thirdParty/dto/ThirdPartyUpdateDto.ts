'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class ThirdPartyUpdateDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  bimeNumber: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiPropertyOptional()
  startDate: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiPropertyOptional()
  endDate: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  isCash: boolean;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @ApiPropertyOptional()
  fullAmount: number;

  @IsString()
  @IsUUID('4')
  @IsOptional()
  @ApiPropertyOptional()
  insurerId: string;

  @IsString()
  @IsUUID('4')
  @IsOptional()
  @ApiPropertyOptional()
  vehicleId: string;
}
