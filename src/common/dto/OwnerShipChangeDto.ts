'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class OwnerShipChangeDto {
  @IsUUID('4', { message: 'error.pervOwner.uuidV4' })
  @ApiProperty()
  readonly pervOwner?: string;

  @IsUUID('4', { message: 'error.nextOwner.uuidV4' })
  @ApiProperty()
  readonly nextOwner?: string;
}
