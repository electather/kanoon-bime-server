'use strict';

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import { GetOneOptions } from '../../common/dto/GetOneOptions';
import { OwnerShipChangeDto } from '../../common/dto/OwnerShipChangeDto';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { ParseUUIDPipeV4 } from '../../pipes/parse-uuid-v4.pipe';
import { UserCreateDTO } from './dto/UserCreateDto';
import { UserDto } from './dto/UserDto';
import { UsersPageDto } from './dto/UsersPageDto';
import { UsersPageOptionsDto } from './dto/UsersPageOptionsDto';
import { UserUpdateDto } from './dto/UsersUpdateDto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('users')
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class UserController {
  constructor(private _userService: UserService) {}

  @Get()
  @Roles(RoleType.ADMIN, RoleType.KARSHENAS)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Get list',
    type: UsersPageDto,
  })
  getList(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: UsersPageOptionsDto,
  ): Promise<UsersPageDto> {
    return this._userService.getUsersAlt(pageOptionsDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: UserDto,
    description: 'user',
  })
  @Roles(RoleType.ADMIN, RoleType.KARSHENAS)
  @UseGuards(AuthGuard, RolesGuard)
  async findOne(
    @Param('id', new ParseUUIDPipeV4())
    id: string,
    @Query(new ValidationPipe({ transform: true }))
    options: GetOneOptions,
  ): Promise<UserDto> {
    return (
      await this._userService.findOne(
        { id },
        {
          relations: options.fields,
        },
      )
    )?.toDto();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({
    type: UserDto,
    description: 'Created item',
  })
  @Roles(RoleType.ADMIN, RoleType.KARSHENAS)
  @UseGuards(AuthGuard, RolesGuard)
  async createOne(
    @AuthUser() creator: UserEntity,
    @Body() dto: UserCreateDTO,
  ): Promise<UserDto> {
    return (await this._userService.createUser(dto, creator))?.toDto();
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: UserDto,
    description: 'edited item',
  })
  @UseGuards(AuthGuard)
  editOne(
    @AuthUser() user: UserEntity,
    @Body() updateDto: UserUpdateDto,
    @AuthUser() editor: UserEntity,
  ): Promise<UserDto> {
    return this._userService.updateUser(user.id, updateDto, editor);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: UserDto,
    description: 'edited item',
  })
  @Roles(RoleType.ADMIN, RoleType.KARSHENAS)
  @UseGuards(AuthGuard, RolesGuard)
  editById(
    @Param('id', new ParseUUIDPipeV4())
    id: string,
    @Body() updateDto: UserUpdateDto,
    @AuthUser() editor: UserEntity,
  ): Promise<UserDto> {
    return this._userService.updateUser(id, updateDto, editor);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: UserDto,
    description: 'deleted item',
  })
  @Roles(RoleType.ADMIN, RoleType.KARSHENAS)
  @UseGuards(AuthGuard, RolesGuard)
  deleteById(
    @Param('id', new ParseUUIDPipeV4())
    id: string,
    @AuthUser() editor: UserEntity,
  ): Promise<UserDto> {
    return this._userService.deleteUser(id, editor);
  }

  @Put('change-ownership')
  @HttpCode(HttpStatus.OK)
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  changeOwnership(
    @Query(new ValidationPipe({ transform: true }))
    dto: OwnerShipChangeDto,
  ) {
    return this._userService.changeOwnership(dto);
  }
}
