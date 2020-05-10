'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

import { IsCellNumber } from '../../../decorators/validators.decorator';

export class UserLoginDto {
  @IsString()
  @ApiProperty()
  @IsCellNumber()
  readonly phone: string;

  @IsString()
  @ApiProperty()
  readonly password: string;

  @IsBoolean()
  @ApiProperty()
  readonly remember: boolean;
}
