'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { RoleType } from '../../../common/constants/role-type';
import { AbstractDto } from '../../../common/dto/AbstractDto';
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

  @ApiPropertyOptional()
  melliCode: string;

  @ApiPropertyOptional()
  address: string;

  @ApiPropertyOptional()
  avatar: string;
  constructor(user: UserEntity) {
    super(user);
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.role = user.role;
    this.phone = user.phone;
    this.melliCode = user.melliCode;
    this.avatar = user.avatar;
  }
}
