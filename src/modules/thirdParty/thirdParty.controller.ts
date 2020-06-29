'use strict';

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { UserEntity } from '../user/user.entity';
import { ThirdPartyCreateDto } from './dto/ThirdPartyCreateDto';
import { ThirdPartyDto } from './dto/ThirdPartyDto';
import { ThirdPartyPageDto } from './dto/ThirdPartyPageDto';
import { ThirdPartyPageOptionsDto } from './dto/ThirdPartyPageOptionsDto';
import { ThirdPartyStatOptionsDto } from './dto/ThirdPartyStatOptionsDto';
import { ThirdPartyUpdateDto } from './dto/ThirdPartyUpdateDto';
import { ThirdPartyService } from './thirdParty.service';

@Controller('third-party')
@ApiTags('third-party')
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
@UseInterceptors(AuthUserInterceptor)
export class ThirdPartyController {
  constructor(private _thirdPartyService: ThirdPartyService) {}

  @Get('info/:id')
  @Roles(RoleType.ADMIN, RoleType.KARSHENAS)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get list',
    type: ThirdPartyPageDto,
  })
  async getOne(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
  ): Promise<ThirdPartyDto> {
    return (await this._thirdPartyService.findOne(id))?.toDto();
  }

  @Get('stats/daily')
  @Roles(RoleType.ADMIN, RoleType.KARSHENAS)
  @HttpCode(HttpStatus.OK)
  async getDailyStats(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: ThirdPartyStatOptionsDto,
    @AuthUser() role: UserEntity,
  ) {
    return this._thirdPartyService.getDailyStats(pageOptionsDto, role);
  }

  @Get('stats/total')
  @Roles(RoleType.ADMIN, RoleType.KARSHENAS)
  @HttpCode(HttpStatus.OK)
  async getTotalStats(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: ThirdPartyStatOptionsDto,
    @AuthUser() role: UserEntity,
  ) {
    return this._thirdPartyService.getTotalStats(pageOptionsDto, role);
  }

  @Get()
  @Roles(RoleType.ADMIN, RoleType.KARSHENAS)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get list',
    type: ThirdPartyPageDto,
  })
  getList(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: ThirdPartyPageOptionsDto,
    @AuthUser() creator: UserEntity,
  ): Promise<ThirdPartyPageDto> {
    return this._thirdPartyService.getList(pageOptionsDto, creator);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @Roles(RoleType.ADMIN, RoleType.KARSHENAS)
  @ApiOkResponse({
    type: ThirdPartyDto,
    description: 'created object',
  })
  createArchiveLocation(
    @Body() createArchiveLocationDto: ThirdPartyCreateDto,
    @AuthUser() creator: UserEntity,
  ): Promise<ThirdPartyDto> {
    return this._thirdPartyService.createThirdParty(
      createArchiveLocationDto,
      creator,
    );
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: ThirdPartyDto,
    description: 'edited ArchiveLocation',
  })
  @Roles(RoleType.ADMIN, RoleType.KARSHENAS)
  editOne(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
    @Body() updateArchiveLocationDto: ThirdPartyUpdateDto,
    @AuthUser() creator: UserEntity,
  ): Promise<ThirdPartyDto> {
    return this._thirdPartyService.updateThirdParty(
      id,
      updateArchiveLocationDto,
      creator,
    );
  }

  @Delete(':id')
  @Roles(RoleType.ADMIN, RoleType.KARSHENAS)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: ThirdPartyDto,
    description: 'deleted ArchiveLocation',
  })
  delete(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
    @AuthUser() creator: UserEntity,
  ): Promise<ThirdPartyDto> {
    return this._thirdPartyService.deleteThirdParty(id, creator);
  }
}
