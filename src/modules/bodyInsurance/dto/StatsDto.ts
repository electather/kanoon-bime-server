import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../common/dto/PageMetaDto';
import { BodyInsuranceDto } from './BodyInsuranceDto';

export class BodyInsuranceStatsDto {
  @ApiProperty({
    type: () => BodyInsuranceDto,
    isArray: true,
  })
  readonly data: BodyInsuranceDto[];

  @ApiProperty({ type: () => PageMetaDto })
  readonly meta: PageMetaDto;

  constructor(data: BodyInsuranceDto[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
