import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { PageOptionsDto } from '../../../common/dto/PageOptionsDto';
import { IsMelliCode } from '../../../decorators/validators.decorator';

export class UsersPageOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional()
  @IsString()
  @IsMelliCode()
  @IsOptional()
  readonly melliCode?: string;
}
