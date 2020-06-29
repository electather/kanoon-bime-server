import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

import { PageOptionsDto } from '../../../common/dto/PageOptionsDto';

export class BodyInsurancePageOptionsDto extends PageOptionsDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly bimeNumber?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiPropertyOptional()
  readonly creationDateMin?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiPropertyOptional()
  readonly creationDateMax?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiPropertyOptional()
  readonly expiryDateMin?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiPropertyOptional()
  readonly expiryDateMax?: Date;
}
