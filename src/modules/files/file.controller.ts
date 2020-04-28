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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import { Roles } from '../../decorators/roles.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { IFile } from '../../interfaces/IFile';
import { CreateFileDto } from './dto/FileCreateDto';
import { FileDto } from './dto/FileDto';
import { FileService } from './file.service';

@Controller('file')
@ApiTags('file')
export class FileController {
  constructor(private readonly _fileService: FileService) {}

  @Get(':fileId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: FileDto,
    description: 'get file',
  })
  async getFile(
    @Param('fileId', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<FileDto> {
    return (await this._fileService.getFile(id)).toDto();
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOkResponse({
    type: FileDto,
    description: 'created File object',
  })
  @UseGuards(AuthGuard)
  @UseInterceptors(AuthUserInterceptor)
  @ApiBearerAuth()
  async createFile(
    @Body() createFileDto: CreateFileDto,
    @UploadedFile() file: IFile,
  ): Promise<FileDto> {
    return (await this._fileService.createFile(createFileDto, file)).toDto();
  }

  @Delete(':fileId')
  @Roles(RoleType.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: FileDto,
    description: 'deleted File',
  })
  @UseGuards(AuthGuard)
  @UseInterceptors(AuthUserInterceptor)
  @ApiBearerAuth()
  deleteFile(
    @Param('fileId', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<FileDto> {
    return this._fileService.deleteFile(id);
  }
}
