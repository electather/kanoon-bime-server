/* eslint-disable import/no-unresolved */
'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { FileDto } from '../../files/dto/FileDto';
import { UserDtoMinimal } from '../../user/dto/UserDtoMinimal';
import { UserInfoEntity } from '../userInfo.entity';

export class UserInfoDto extends AbstractDto {
  @ApiPropertyOptional({ type: () => UserDtoMinimal })
  user: UserDtoMinimal;

  @ApiPropertyOptional()
  melliCode: string;

  @ApiPropertyOptional()
  address?: string;

  @ApiPropertyOptional({ type: () => FileDto })
  melliCardScanFront?: FileDto;

  @ApiPropertyOptional({ type: () => FileDto })
  melliCardScanBack?: FileDto;

  @ApiPropertyOptional({ type: () => FileDto })
  payrollScan?: FileDto;

  constructor(userInfo: UserInfoEntity) {
    super(userInfo);
    this.user = userInfo.user?.toDto();
    this.melliCode = userInfo.melliCode;
    this.address = userInfo.address;
    this.melliCardScanFront = userInfo.melliCardScanFront?.toDto();
    this.melliCardScanBack = userInfo.melliCardScanBack?.toDto();
    this.payrollScan = userInfo.payrollScan?.toDto();
  }
}
