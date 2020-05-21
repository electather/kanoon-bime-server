'use strict';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class VehicleCreateDto {
  @IsString()
  @IsUUID('4')
  @ApiProperty()
  issuerId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  ownerName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  ownerLastName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  address: string;

  @IsString()
  @Length(4, 17)
  @ApiProperty()
  engineNumber: string;

  @IsString()
  @Length(4, 20)
  @ApiProperty()
  chassisNumber: string;

  @IsString()
  @Length(2, 2)
  @ApiProperty()
  plateFirstTwoNumbers: string;

  @IsString()
  @Length(1, 1)
  @ApiProperty()
  plateLetter: string;

  @IsString()
  @Length(3, 3)
  @ApiProperty()
  plateLastThreeNumbers: string;

  @IsString()
  @Length(2, 2)
  @ApiProperty()
  plateIRNumber: string;

  @IsString()
  @IsUUID('4')
  @ApiProperty()
  attachmentId: string;
}
