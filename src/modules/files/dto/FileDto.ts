/* eslint-disable simple-import-sort/sort */
'use strict';

import { ApiProperty } from '@nestjs/swagger';

import { FileEntity } from '../file.entity';
import { AbstractDto } from '../../../common/dto/AbstractDto';
import { UserDto } from '../../user/dto/UserDto';

export class FileDto extends AbstractDto {
  @ApiProperty()
  description: string;

  @ApiProperty()
  file: string;

  @ApiProperty({ type: () => UserDto })
  creator: UserDto;

  constructor(item: FileEntity) {
    super(item);
    this.description = item.description;
    this.creator = item.creator?.toDto();
    this.file = item.file;
  }
}
