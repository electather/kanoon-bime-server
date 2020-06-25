import { Injectable, NotFoundException } from '@nestjs/common';

import { IFile } from '../../interfaces/IFile';
import { FileWriteService } from '../../shared/services/files.service';
import { AuthService } from '../auth/auth.service';
import { CreateFileDto } from './dto/FileCreateDto';
import { FileDto } from './dto/FileDto';
import { FileEntity } from './file.entity';
import { FileRepository } from './file.repository';

@Injectable()
export class FileService {
  constructor(
    private readonly _fileRepository: FileRepository,
    private readonly _fileService: FileWriteService,
  ) {}

  async getFile(id: string): Promise<FileEntity> {
    const file = await this._fileRepository.findOne(id);
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }

  async createFile(
    createFileDto: CreateFileDto,
    uploadedFile: IFile,
  ): Promise<FileEntity> {
    const uploadFile = await this._fileService.writeFile(uploadedFile);

    const user = AuthService.getAuthUser();
    const file = this._fileRepository.create({
      description: createFileDto.description,
      file: uploadFile,
      creator: user,
    });
    return this._fileRepository.save(file);
  }

  async deleteFile(id: string): Promise<FileDto> {
    const found = await this.getFile(id);
    const file = await this._fileRepository.delete(id);
    if (file.affected === 0) {
      throw new NotFoundException();
    }
    return found.toDto();
  }
}
