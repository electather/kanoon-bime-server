import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../common/dto/PageMetaDto';
import { UserDto } from './UserDto';
import { UserDtoMinimal } from './UserDtoMinimal';

export class UsersPageDto {
  @ApiProperty({
    type: () => UserDtoMinimal,
    isArray: true,
  })
  readonly data: UserDtoMinimal[];

  @ApiProperty({ type: () => PageMetaDto })
  readonly meta: PageMetaDto;

  constructor(data: UserDto[], meta: PageMetaDto) {
    this.data = data.map((item) => new UserDtoMinimal(item));
    this.meta = meta;
  }
}
