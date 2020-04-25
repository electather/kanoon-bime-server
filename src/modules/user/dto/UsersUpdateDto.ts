'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

import {
  ToEnglishDigits,
  Trim,
} from '../../../decorators/transforms.decorator';
import {
  IsCellNumber,
  IsMelliCode,
} from '../../../decorators/validators.decorator';

export class UserUpdateDto {
  @Trim()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  readonly firstName: string;

  @Trim()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  readonly lastName: string;

  @IsString()
  @ToEnglishDigits()
  @IsMelliCode({ message: 'not a valid melliCode' })
  @IsOptional()
  @ApiPropertyOptional()
  readonly melliCode: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  @ApiPropertyOptional({ minLength: 6 })
  readonly password: string;

  @IsCellNumber({ message: 'invalid phone number' })
  @IsString()
  @ToEnglishDigits()
  @IsOptional()
  @ApiPropertyOptional()
  readonly phone: string;

  @IsUUID('4')
  @IsOptional()
  @ApiPropertyOptional()
  readonly avatarId: string;
}
