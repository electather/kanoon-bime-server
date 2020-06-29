import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { PageOptionsDto } from '../../../common/dto/PageOptionsDto';

export class ThirdPartyPageOptionsDto extends PageOptionsDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly bimeNumber?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly creationDateMin?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly creationDateMax?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly expiryDateMin?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly expiryDateMax?: string;
}
