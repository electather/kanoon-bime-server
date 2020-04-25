/* eslint-disable simple-import-sort/sort */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { FileRepository } from './file.repository';

@Module({
  controllers: [FileController],
  imports: [TypeOrmModule.forFeature([FileRepository]), AuthModule],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
