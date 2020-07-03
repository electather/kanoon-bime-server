import { BadRequestException, ParseUUIDPipe } from '@nestjs/common';

export class ParseUUIDPipeV4 extends ParseUUIDPipe {
  constructor() {
    super({
      version: '4',
      exceptionFactory: () => new BadRequestException('error.uuidV4'),
    });
  }
}
