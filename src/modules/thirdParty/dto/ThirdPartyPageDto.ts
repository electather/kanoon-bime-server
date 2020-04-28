import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../common/dto/PageMetaDto';
import { ThirdPartyDto } from './ThirdPartyDto';

export class ThirdPartyPageDto {
  @ApiProperty({
    type: () => ThirdPartyDto,
    isArray: true,
  })
  readonly data: ThirdPartyDto[];

  @ApiProperty({ type: () => PageMetaDto })
  readonly meta: PageMetaDto;

  constructor(data: ThirdPartyDto[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
