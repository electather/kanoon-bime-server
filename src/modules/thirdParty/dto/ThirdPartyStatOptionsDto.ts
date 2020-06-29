import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsUUID } from 'class-validator';

import { PageOptionsDto } from '../../../common/dto/PageOptionsDto';

export class ThirdPartyStatOptionsDto extends PageOptionsDto {
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiPropertyOptional()
  readonly startDateMin?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiPropertyOptional()
  readonly startDateMax?: Date;

  @IsUUID('4')
  @IsOptional()
  @ApiPropertyOptional()
  readonly userId?: string;
}
