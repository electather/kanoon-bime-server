import { ValueTransformer } from 'typeorm';

import { UtilsService } from '../../providers/utils.service';

export class PasswordTransformer implements ValueTransformer {
  to(value?: string) {
    if (!value) {
      return value;
    }
    return UtilsService.generateHash(value);
  }
  from(value: string) {
    return value;
  }
}
