import { Injectable, NotFoundException } from '@nestjs/common';

import { BucketTypes } from '../../common/constants/bucket-type';
import { ExtensionNotSupportedException } from '../../exceptions/file-not-image.exception';
import { IFile } from '../../interfaces/IFile';
import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { ValidatorService } from '../../shared/services/validator.service';
import { AuthService } from '../auth/auth.service';
import { CreateFileDto } from './dto/FileCreateDto';
import { FileDto } from './dto/FileDto';
import { FileEntity } from './file.entity';
import { FileRepository } from './file.repository';

@Injectable()
export class FileService {
  constructor(
    private readonly _fileRepository: FileRepository,
    private readonly _awsService: AwsS3Service,
    private readonly _validatorService: ValidatorService,
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
    if (
      uploadedFile &&
      (!this._validatorService.isImage(uploadedFile.mimetype) ||
        !this._validatorService.isArchive(uploadedFile.mimetype))
    ) {
      throw new ExtensionNotSupportedException();
    }

    const uploadFile = await this._awsService.uploadImage(
      uploadedFile,
      BucketTypes.COMMON,
    );

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
