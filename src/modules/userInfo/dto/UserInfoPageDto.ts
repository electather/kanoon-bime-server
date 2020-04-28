import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../common/dto/PageMetaDto';
import { UserInfoDto } from './UserInfoDto';

export class UserInfosPageDto {
  @ApiProperty({
    type: () => UserInfoDto,
    isArray: true,
  })
  readonly data: UserInfoDto[];

  @ApiProperty({ type: () => PageMetaDto })
  readonly meta: PageMetaDto;

  constructor(data: UserInfoDto[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
