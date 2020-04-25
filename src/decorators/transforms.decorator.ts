/* tslint:disable:naming-convention */

import { Transform } from 'class-transformer';
import * as _ from 'lodash';

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

/**
 * @description transforms persian and arabic digits to english
 * @example
 * @ToEnglishDigits()
 * phoneNumber: string;
 * @constructor
 */
export function ToEnglishDigits(): (target: any, key: string) => void {
  return Transform(
    (value) => {
      let res: string;
      // convert persian digits [۰۱۲۳۴۵۶۷۸۹]
      let e = '۰'.charCodeAt(0);
      res = value.replace(/[۰-۹]/g, (t: string) => t.charCodeAt(0) - e);

      // convert arabic indic digits [٠١٢٣٤٥٦٧٨٩]
      e = '٠'.charCodeAt(0);
      res = value.replace(/[٠-٩]/g, (t: string) => t.charCodeAt(0) - e);
      return res;
    },
    { toClassOnly: true },
  );
}
