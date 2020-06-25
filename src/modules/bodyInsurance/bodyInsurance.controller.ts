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
import { BodyInsuranceService } from './bodyInsurance.service';
import { BodyInsuranceCreateDto } from './dto/BodyInsuranceCreateDto';
import { BodyInsuranceDto } from './dto/BodyInsuranceDto';
import { BodyInsurancePageDto } from './dto/BodyInsurancePageDto';
import { BodyInsurancePageOptionsDto } from './dto/BodyInsurancePageOptionsDto';
import { BodyInsuranceUpdateDto } from './dto/BodyInsuranceUpdateDto';

@Controller('body-insurance')
@ApiTags('body-insurance')
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
@UseInterceptors(AuthUserInterceptor)
export class BodyInsuranceController {
  constructor(private _bodyInsuranceService: BodyInsuranceService) {}

  @Get('info/:id')
  @Roles(RoleType.ADMIN, RoleType.KARSHENAS)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get list',
    type: BodyInsurancePageDto,
  })
  async getOne(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
  ): Promise<BodyInsuranceDto> {
    return (await this._bodyInsuranceService.findOne(id))?.toDto();
  }

  @Get('stats')
  @Roles(RoleType.ADMIN, RoleType.KARSHENAS)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get stats',
    type: BodyInsurancePageDto,
  })
  async getStats() {
    return this._bodyInsuranceService.getStats();
  }

  @Get()
  @Roles(RoleType.ADMIN, RoleType.KARSHENAS)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get list',
    type: BodyInsurancePageDto,
  })
  getList(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: BodyInsurancePageOptionsDto,
  ): Promise<BodyInsurancePageDto> {
    return this._bodyInsuranceService.getList(pageOptionsDto);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @Roles(RoleType.ADMIN, RoleType.KARSHENAS)
  @ApiOkResponse({
    type: BodyInsuranceDto,
    description: 'created object',
  })
  create(
    @Body() createDto: BodyInsuranceCreateDto,
    @AuthUser() creator: UserEntity,
  ): Promise<BodyInsuranceDto> {
    return this._bodyInsuranceService.createBodyInsurance(createDto, creator);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: BodyInsuranceDto,
    description: 'edited item',
  })
  @Roles(RoleType.ADMIN, RoleType.KARSHENAS)
  editOne(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
    @Body() updateDto: BodyInsuranceUpdateDto,
    @AuthUser() creator: UserEntity,
  ): Promise<BodyInsuranceDto> {
    return this._bodyInsuranceService.updateBodyInsurance(
      id,
      updateDto,
      creator,
    );
  }

  @Delete(':id')
  @Roles(RoleType.ADMIN, RoleType.KARSHENAS)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: BodyInsuranceDto,
    description: 'deleted item',
  })
  delete(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
    @AuthUser() creator: UserEntity,
  ): Promise<BodyInsuranceDto> {
    return this._bodyInsuranceService.deleteBodyInsurance(id, creator);
  }
}
