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
  @IsString({ message: 'error.user.firstName.string' })
  @IsNotEmpty({ message: 'error.user.firstName.empty' })
  @ApiProperty()
  readonly firstName: string;

  @Trim()
  @IsString({ message: 'error.user.lastName.string' })
  @IsNotEmpty({ message: 'error.user.lastName.empty' })
  @ApiProperty()
  readonly lastName: string;

  @IsString({ message: 'error.user.melliCode.string' })
  @ToEnglishDigits()
  @IsMelliCode({ message: 'error.user.melliCode.valid' })
  @ApiProperty()
  readonly melliCode: string;

  @IsCellNumber({ message: 'error.user.phone.valid' })
  @IsString({ message: 'error.user.phone.string' })
  @ToEnglishDigits()
  @ApiProperty()
  readonly phone: string;

  @IsUUID('4', { message: 'error.user.avatarId.uuidV4' })
  @IsOptional()
  @ApiPropertyOptional()
  readonly avatarId: string;

  @IsString({ message: 'error.user.address.string' })
  @IsNotEmpty({ message: 'error.user.address.empty' })
  @IsOptional()
  @ApiPropertyOptional()
  readonly address?: string;

  @IsString({ message: 'error.user.melliCardScanFrontId.string' })
  @IsUUID('4', { message: 'error.user.melliCardScanFrontId.uuidV4' })
  @IsOptional()
  @ApiPropertyOptional()
  readonly melliCardScanFrontId?: string;

  @IsString({ message: 'error.user.melliCardScanBackId.string' })
  @IsUUID('4', { message: 'error.user.melliCardScanBackId.uuidV4' })
  @IsOptional()
  @ApiPropertyOptional()
  readonly melliCardScanBackId?: string;

  @IsString({ message: 'error.user.payrollScanId.string' })
  @IsUUID('4', { message: 'error.user.payrollScanId.uuidV4' })
  @IsOptional()
  @ApiPropertyOptional()
  readonly payrollScanId?: string;
}
