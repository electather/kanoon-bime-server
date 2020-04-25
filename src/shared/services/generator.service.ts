import { Injectable } from '@nestjs/common';
import { random } from 'lodash';
import * as uuid from 'uuid/v1';

@Injectable()
export class GeneratorService {
  public uuid(): string {
    return uuid();
  }
  public fileName(ext: string) {
    return this.uuid() + '.' + ext;
  }
  public verificationCode(): string {
    return String(random(100000, 999999));
  }
}
