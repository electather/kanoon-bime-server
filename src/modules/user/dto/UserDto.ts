'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { RoleType } from '../../../common/constants/role-type';
import { AbstractDto } from '../../../common/dto/AbstractDto';
import { BodyInsuranceDto } from '../../bodyInsurance/dto/BodyInsuranceDto';
import { FileDto } from '../../files/dto/FileDto';
import { ThirdPartyDto } from '../../thirdParty/dto/ThirdPartyDto';
import { UserInfoDto } from '../../userInfo/dto/UserInfoDto';
import { VehicleDto } from '../../vehicle/dto/VehicleDto';
import { UserEntity } from '../user.entity';

export class UserDto extends AbstractDto {
  @ApiPropertyOptional()
  firstName: string;

  @ApiPropertyOptional()
  lastName: string;

  @ApiPropertyOptional({ enum: RoleType })
  role: RoleType;

  @ApiPropertyOptional()
  phone: string;

  @ApiPropertyOptional({ type: () => FileDto })
  avatar?: FileDto;

  @ApiPropertyOptional({ type: () => UserInfoDto })
  info?: UserInfoDto;

  @ApiPropertyOptional({ type: () => UserDto })
  creator?: UserDto;

  @ApiPropertyOptional({ type: () => ThirdPartyDto, isArray: true })
  tpi?: ThirdPartyDto[];

  @ApiPropertyOptional({ type: () => BodyInsuranceDto, isArray: true })
  bi?: BodyInsuranceDto[];

  @ApiPropertyOptional({ type: () => VehicleDto, isArray: true })
  vehicles?: VehicleDto[];

  constructor(user: UserEntity) {
    super(user);
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.role = user.role;
    this.phone = user.phone;
    this.avatar = user.avatar?.toDto();
    this.info = user.info?.toDto();
    this.tpi = user.tpi?.toDtos();
    this.bi = user.bi?.toDtos();
    this.vehicles = user.vehicles?.toDtos();
    this.creator = user.creator?.toDto();
  }
}
