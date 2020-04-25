'use strict';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

import {
  ToEnglishDigits,
  Trim,
} from '../../../decorators/transforms.decorator';
import {
  IsCellNumber,
  IsMelliCode,
} from '../../../decorators/validators.decorator';

export class UserRegisterDto {
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

  @IsString()
  @MinLength(6)
  @ApiProperty({ minLength: 6 })
  readonly password: string;

  @IsCellNumber({ message: 'invalid phone number' })
  @IsString()
  @ToEnglishDigits()
  @ApiPropertyOptional()
  readonly phone: string;
}
