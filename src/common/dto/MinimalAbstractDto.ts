'use strict';

import { AbstractDto } from './AbstractDto';

export class MinimalAbstractDto {
  id: string;

  constructor(entity: AbstractDto) {
    this.id = entity.id;
  }
}
