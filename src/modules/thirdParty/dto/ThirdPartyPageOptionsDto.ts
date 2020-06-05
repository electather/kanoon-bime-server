import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

import { PageOptionsDto } from '../../../common/dto/PageOptionsDto';

export class ThirdPartyPageOptionsDto extends PageOptionsDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly bimeNumber?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiPropertyOptional()
  readonly creationDateMin?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiPropertyOptional()
  readonly creationDateMax?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiPropertyOptional()
  readonly expiryDateMin?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiPropertyOptional()
  readonly expiryDateMax?: string;
}
