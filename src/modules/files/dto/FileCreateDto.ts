'use strict';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { Trim } from '../../../decorators/transforms.decorator';

export class CreateFileDto {
  @IsString()
  @Trim()
  @IsOptional()
  @ApiPropertyOptional()
  description?: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  file: string;
}
