'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { RoleType } from '../../../common/constants/role-type';
import { AbstractDto } from '../../../common/dto/AbstractDto';
import { FileDto } from '../../files/dto/FileDto';
import { UserInfoDto } from '../../userInfo/dto/UserInfoDto';
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

  constructor(user: UserEntity) {
    super(user);
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.role = user.role;
    this.phone = user.phone;
    this.avatar = user.avatar?.toDto();
    this.info = user.info?.toDto();
  }
}
