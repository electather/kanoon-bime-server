import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

import { PageOptionsDto } from '../../../common/dto/PageOptionsDto';

export class UsersPageOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional()
  @IsString()
  @Length(10, 10)
  @IsOptional()
  readonly melliCode?: string;
}
