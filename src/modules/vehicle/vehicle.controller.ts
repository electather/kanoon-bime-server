'use strict';

import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import { Roles } from '../../decorators/roles.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { VehiclesPageDto } from './dto/VehiclePageDto';
import { VehiclesPageOptionsDto } from './dto/VehiclePageOptionsDto';
import { VehicleService } from './vehicle.service';

@Controller('vehicles')
@ApiTags('vehicles')
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
export class VehicleController {
  constructor(private _vehicleService: VehicleService) {}

  @Get('vehicles')
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
}
