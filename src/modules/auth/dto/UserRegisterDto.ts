'use strict';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

import { Trim } from '../../../decorators/transforms.decorator';

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
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ minLength: 6 })
  readonly password: string;

  @IsPhoneNumber('IR')
  @IsOptional()
  @ApiPropertyOptional()
  readonly phone: string;
}
