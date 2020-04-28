'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  ValidateNested,
} from 'class-validator';

import {
  ToEnglishDigits,
  Trim,
} from '../../../decorators/transforms.decorator';
import { IsCellNumber } from '../../../decorators/validators.decorator';
import { UserInfoUpdateDto } from '../../userInfo/dto/UserInfoUpdateDto';

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

  @ValidateNested()
  @IsOptional()
  @ApiPropertyOptional()
  readonly userInfo: UserInfoUpdateDto;
}
