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
import { ThirdPartyCreateDto } from './dto/ThirdPartyCreateDto';
import { ThirdPartyDto } from './dto/ThirdPartyDto';
import { ThirdPartyPageDto } from './dto/ThirdPartyPageDto';
import { ThirdPartyPageOptionsDto } from './dto/ThirdPartyPageOptionsDto';
import { ThirdPartyUpdateDto } from './dto/ThirdPartyUpdateDto';
import { ThirdPartyService } from './thirdParty.service';

@Controller('third-party')
@ApiTags('third-party')
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
export class ThirdPartyController {
  constructor(private _thirdPartyService: ThirdPartyService) {}

  @Get(':id')
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
  ): Promise<ThirdPartyPageDto> {
    return this._thirdPartyService.getList(pageOptionsDto);
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
  ): Promise<ThirdPartyDto> {
    return this._thirdPartyService.createThirdParty(createArchiveLocationDto);
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
  ): Promise<ThirdPartyDto> {
    return this._thirdPartyService.updateThirdParty(
      id,
      updateArchiveLocationDto,
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
  ): Promise<ThirdPartyDto> {
    return this._thirdPartyService.deleteThirdParty(id);
  }
}
