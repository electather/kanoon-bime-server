import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class ValidatorService {
  public isImage(mimeType: string): boolean {
    const validTypes = ['image/jpeg', 'image/png'];

    return _.includes(validTypes, mimeType);
  }

  public isArchive(mimeType: string): boolean {
    const validTypes = ['application/zip', 'application/x-rar-compressed'];

    return _.includes(validTypes, mimeType);
  }
}
