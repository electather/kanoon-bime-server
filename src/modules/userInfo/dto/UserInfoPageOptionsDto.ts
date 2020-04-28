import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, MaxLength } from 'class-validator';

import { PageOptionsDto } from '../../../common/dto/PageOptionsDto';

export class UserInfosPageOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional()
  @MaxLength(10)
  @IsOptional()
  readonly melliCode?: string;
}
