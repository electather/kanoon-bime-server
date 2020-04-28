'use strict';

import { BadRequestException } from '@nestjs/common';

export class ExtensionNotSupportedException extends BadRequestException {
  constructor(message?: string | object | any, error?: string) {
    if (message) {
      super(message, error);
    } else {
      super('error.extension_not_supported');
    }
  }
}
