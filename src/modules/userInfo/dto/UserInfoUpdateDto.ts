'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

import { IsMelliCode } from '../../../decorators/validators.decorator';

export class UserInfoUpdateDto {
  @IsString()
  @IsMelliCode()
  @IsOptional()
  @ApiPropertyOptional()
  melliCode: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  address?: string;

  @IsString()
  @IsUUID('4')
  @IsOptional()
  @ApiPropertyOptional()
  melliCardScanFrontId: string;

  @IsString()
  @IsUUID('4')
  @IsOptional()
  @ApiPropertyOptional()
  melliCardScanBackId: string;

  @IsString()
  @IsUUID('4')
  @IsOptional()
  @ApiPropertyOptional()
  payrollScanId: string;
}
