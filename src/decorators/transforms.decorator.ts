/* tslint:disable:naming-convention */

import { Transform } from 'class-transformer';
import _ from 'lodash';

/**
 * @description trim spaces from start and end, replace multiple spaces with one.
 * @example
 * @ApiProperty()
 * @IsString()
 * @Trim()
 * name: string;
 * @constructor
 */
export function Trim(): (target: any, key: string) => void {
  return Transform((value: string | string[]) => {
    if (_.isArray(value)) {
      return (<string[]>value).map((v) => _.trim(v).replace(/\s\s+/g, ' '));
    }
    return _.trim(value).replace(/\s\s+/g, ' ');
  });
}

/**
 * @description convert string or number to integer
 * @example
 * @IsNumber()
 * @ToInt()
 * name: number;
 * @constructor
 */
export function ToInt(): (target: any, key: string) => void {
  return Transform((value) => parseInt(value, 10), { toClassOnly: true });
}

/**
 * @description transforms to array, specially for query params
 * @example
 * @IsNumber()
 * @ToArray()
 * name: number;
 * @constructor
 */
export function ToArray(): (target: any, key: string) => void {
  return Transform(
    (value) => {
      if (_.isNil(value)) {
        return [];
      }
      return _.castArray(value);
    },
    { toClassOnly: true },
  );
}
