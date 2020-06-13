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
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import { Roles } from '../../decorators/roles.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
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
export class VehicleController {
  constructor(private _vehicleService: VehicleService) {}

  @Get(':id')
  @Roles(RoleType.ADMIN, RoleType.KARSHENAS)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get list',
    type: VehicleDto,
  })
  async getOne(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
  ): Promise<VehicleDto> {
    return (await this._vehicleService.findOne(id))?.toDto();
  }

  @Get()
  @Roles(RoleType.ADMIN, RoleType.KARSHENAS)
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

  @Post()
  @HttpCode(HttpStatus.OK)
  @Roles(RoleType.ADMIN, RoleType.KARSHENAS)
  @ApiOkResponse({
    type: VehicleDto,
    description: 'created object',
  })
  createArchiveLocation(
    @Body() createArchiveLocationDto: VehicleCreateDto,
  ): Promise<VehicleDto> {
    return this._vehicleService.createVehicle(createArchiveLocationDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: VehicleDto,
    description: 'edited ArchiveLocation',
  })
  @Roles(RoleType.ADMIN, RoleType.KARSHENAS)
  editOne(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
    @Body() updateArchiveLocationDto: VehicleUpdateDto,
  ): Promise<VehicleDto> {
    return this._vehicleService.updateVehicle(id, updateArchiveLocationDto);
  }

  @Delete(':id')
  @Roles(RoleType.ADMIN, RoleType.KARSHENAS)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: VehicleDto,
    description: 'deleted ArchiveLocation',
  })
  delete(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
  ): Promise<VehicleDto> {
    return this._vehicleService.deleteVehicle(id);
  }
}
