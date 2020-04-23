import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../common/dto/PageMetaDto';
import { VehicleDto } from './VehicleDto';

export class VehiclesPageDto {
  @ApiProperty({
    type: () => VehicleDto,
    isArray: true,
  })
  readonly data: VehicleDto[];

  @ApiProperty({ type: () => PageMetaDto })
  readonly meta: PageMetaDto;

  constructor(data: VehicleDto[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
