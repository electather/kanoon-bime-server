'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
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

  @IsString()
  @Length(2, 2)
  @IsOptional()
  @ApiPropertyOptional()
  plateFirstTwoNumbers: string;

  @IsString()
  @Length(1, 1)
  @IsOptional()
  @ApiPropertyOptional()
  plateLetter: string;

  @IsString()
  @Length(3, 3)
  @IsOptional()
  @ApiPropertyOptional()
  plateLastThreeNumbers: string;

  @IsString()
  @Length(2, 2)
  @IsOptional()
  @ApiPropertyOptional()
  plateIRNumber: string;
}
