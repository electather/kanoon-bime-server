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
import { UserEntity } from '../../modules/user/user.entity';
import { VehicleCreateDto } from './dto/VehicleCreateDto';
import { VehicleDto } from './dto/VehicleDto';
import { VehiclesPageDto } from './dto/VehiclePageDto';
import { VehiclesPageOptionsDto } from './dto/VehiclePageOptionsDto';
import { VehicleUpdateDto } from './dto/VehicleUpdateDto';
import { VehicleService } from './vehicle.service';

@Controller('vehicles')
@ApiTags('vehicles')
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
@UseInterceptors(AuthUserInterceptor)
export class VehicleController {
  constructor(private _vehicleService: VehicleService) {}

  @Get()
  @Roles(RoleType.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get vehicles list',
    type: VehiclesPageDto,
  })
  getVehicles(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: VehiclesPageOptionsDto,
  ): Promise<VehiclesPageDto> {
    return this._vehicleService.getVehicles(pageOptionsDto);
  }
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: VehicleDto,
    description: 'vehicle',
  })
  @Roles(RoleType.ADMIN, RoleType.KARSHENAS)
  @UseGuards(AuthGuard, RolesGuard)
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
  ): Promise<VehicleDto> {
    return (
      await this._vehicleService.findOne(
        { id },
        { relations: ['insurer', 'tpi', 'attachment'] },
      )
    )?.toDto();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({
    type: VehicleDto,
    description: 'Created item',
  })
  @Roles(RoleType.ADMIN, RoleType.KARSHENAS)
  @UseGuards(AuthGuard, RolesGuard)
  async createOne(
    @AuthUser() creator: UserEntity,
    @Body() dto: VehicleCreateDto,
  ): Promise<VehicleDto> {
    return (await this._vehicleService.createVehicle(dto, creator))?.toDto();
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: VehicleDto,
    description: 'edited item',
  })
  @Roles(RoleType.ADMIN, RoleType.KARSHENAS)
  @UseGuards(AuthGuard, RolesGuard)
  editById(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
    @Body() updateDto: VehicleUpdateDto,
    @AuthUser() editor: UserEntity,
  ): Promise<VehicleDto> {
    return this._vehicleService.updateVehicle(id, updateDto, editor);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: VehicleDto,
    description: 'deleted item',
  })
  @Roles(RoleType.ADMIN, RoleType.KARSHENAS)
  @UseGuards(AuthGuard, RolesGuard)
  deleteById(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
    @AuthUser() editor: UserEntity,
  ): Promise<VehicleDto> {
    return this._vehicleService.deleteVehicle(id, editor);
  }
}
