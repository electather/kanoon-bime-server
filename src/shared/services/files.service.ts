import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as mime from 'mime-types';

import { IFile } from '../../interfaces/IFile';
import { UtilsService } from '../../providers/utils.service';
import { ConfigService } from './config.service';
import { GeneratorService } from './generator.service';

@Injectable()
export class FileWriteService {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _generatorService: GeneratorService,
  ) {}

  async writeFile(file: IFile): Promise<string> {
    const fileName = this._generatorService.fileName(
      <string>mime.extension(file.mimetype),
    );
    const key = this._configService.getHomeDir + '/' + fileName;
    await UtilsService.ensureDirectoryExistence(key);
    await fs.writeFile(key, file.buffer);

    return key;
  }

  static getUrl(key: string) {
    return key;
  }
}
