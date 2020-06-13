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
  @IsString()
  @IsUUID('4')
  @IsOptional()
  @ApiPropertyOptional()
  insurerId: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  ownerName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  ownerLastName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  address: string;

  @IsString()
  @Length(4, 17)
  @IsOptional()
  @ApiPropertyOptional()
  engineNumber: string;

  @IsString()
  @Length(4, 20)
  @IsOptional()
  @ApiPropertyOptional()
  chassisNumber: string;

  @IsNumber()
  @Min(10)
  @Max(99)
  @IsOptional()
  @ApiPropertyOptional()
  plateFirstTwoNumbers: number;

  @IsNumber()
  @Min(1)
  @Max(31)
  @IsOptional()
  @ApiPropertyOptional()
  plateLetter: number;

  @IsNumber()
  @Min(100)
  @Max(999)
  @IsOptional()
  @ApiPropertyOptional()
  plateLastThreeNumbers: number;

  @IsNumber()
  @Min(10)
  @Max(99)
  @IsOptional()
  @ApiPropertyOptional()
  plateIRNumber: number;

  @IsString()
  @IsUUID('4')
  @ApiPropertyOptional()
  attachmentId: string;
}
