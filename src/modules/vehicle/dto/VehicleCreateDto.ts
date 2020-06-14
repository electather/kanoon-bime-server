'use strict';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
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

export class VehicleCreateDto {
  @IsString({ message: 'error.string' })
  @IsNotEmpty({ message: 'error.empty' })
  @IsUUID('4')
  @ApiProperty()
  issuerId: string;

  @IsString({ message: 'error.string' })
  @IsNotEmpty({ message: 'error.empty' })
  @ApiProperty()
  ownerName: string;

  @IsString({ message: 'error.string' })
  @IsNotEmpty({ message: 'error.empty' })
  @ApiProperty()
  ownerLastName: string;

  @IsString({ message: 'error.string' })
  @IsNotEmpty({ message: 'error.empty' })
  @IsOptional()
  @ApiPropertyOptional()
  address: string;

  @IsString({ message: 'error.string' })
  @IsNotEmpty({ message: 'error.empty' })
  @Length(4, 17)
  @ApiProperty()
  engineNumber: string;

  @IsString({ message: 'error.string' })
  @IsNotEmpty({ message: 'error.empty' })
  @Length(4, 20)
  @IsOptional()
  @ApiPropertyOptional()
  chassisNumber: string;

  @IsNumber(undefined, { message: 'error.number' })
  @Min(10)
  @Max(99)
  @IsOptional()
  @ApiPropertyOptional()
  plateFirstTwoNumbers: number;

  @IsNumber(undefined, { message: 'error.number' })
  @Min(1)
  @Max(31)
  @Type(() => Number)
  @IsOptional()
  @ApiPropertyOptional()
  plateLetter: number;

  @IsNumber(undefined, { message: 'error.number' })
  @Min(100)
  @Max(999)
  @IsOptional()
  @ApiPropertyOptional()
  plateLastThreeNumbers: number;

  @IsNumber(undefined, { message: 'error.number' })
  @Min(0)
  @Max(99)
  @IsOptional()
  @ApiPropertyOptional()
  plateIRNumber: number;

  @IsString({ message: 'error.string' })
  @IsNotEmpty({ message: 'error.empty' })
  @IsUUID('4')
  @IsOptional()
  @ApiPropertyOptional()
  attachmentId: string;
}
