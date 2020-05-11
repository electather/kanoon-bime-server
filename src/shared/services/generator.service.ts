import { Injectable } from '@nestjs/common';
import { random } from 'lodash';
import { v1 as uuidV1 } from 'uuid';

@Injectable()
export class GeneratorService {
  public uuid(): string {
    return uuidV1();
  }
  public fileName(ext: string) {
    return this.uuid() + '.' + ext;
  }
  public verificationCode(): string {
    return String(random(100000, 999999));
  }
}
