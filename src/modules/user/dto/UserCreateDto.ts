'use strict';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

import {
  ToEnglishDigits,
  Trim,
} from '../../../decorators/transforms.decorator';
import {
  IsCellNumber,
  IsMelliCode,
} from '../../../decorators/validators.decorator';

export class UserCreateDTO {
  @Trim()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly firstName: string;

  @Trim()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly lastName: string;

  @IsString()
  @ToEnglishDigits()
  @IsMelliCode({ message: 'not a valid melliCode' })
  @ApiProperty()
  readonly melliCode: string;

  @IsCellNumber({ message: 'invalid phone number' })
  @IsString()
  @ToEnglishDigits()
  @ApiProperty()
  readonly phone: string;

  @IsUUID('4')
  @IsOptional()
  @ApiPropertyOptional()
  readonly avatarId: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  readonly address?: string;

  @IsString()
  @IsUUID('4')
  @IsOptional()
  @ApiPropertyOptional()
  readonly melliCardScanFrontId?: string;

  @IsString()
  @IsUUID('4')
  @IsOptional()
  @ApiPropertyOptional()
  readonly melliCardScanBackId?: string;

  @IsString()
  @IsUUID('4')
  @IsOptional()
  @ApiPropertyOptional()
  readonly payrollScanId?: string;
}
