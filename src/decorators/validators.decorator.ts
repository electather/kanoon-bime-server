/* tslint:disable:naming-convention */

import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsPassword(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object: any, propertyName: string) => {
    registerDecorator({
      propertyName,
      name: 'isPassword',
      target: object.constructor,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string, _args: ValidationArguments) {
          return /^[a-zA-Z0-9!@#$%^&*]*$/.test(value);
        },
      },
    });
  };
}

export function IsMelliCode(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object: any, propertyName: string) => {
    registerDecorator({
      propertyName,
      name: 'isMelliCode',
      target: object.constructor,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string, _args: ValidationArguments) {
          if (value.length === 10) {
            if (
              value === '1111111111' ||
              value === '0000000000' ||
              value === '2222222222' ||
              value === '3333333333' ||
              value === '4444444444' ||
              value === '5555555555' ||
              value === '6666666666' ||
              value === '7777777777' ||
              value === '8888888888' ||
              value === '9999999999'
            ) {
              return false;
            }
            const c = parseInt(value.charAt(9), 10);
            const n =
              parseInt(value.charAt(0), 10) * 10 +
              parseInt(value.charAt(1), 10) * 9 +
              parseInt(value.charAt(2), 10) * 8 +
              parseInt(value.charAt(3), 10) * 7 +
              parseInt(value.charAt(4), 10) * 6 +
              parseInt(value.charAt(5), 10) * 5 +
              parseInt(value.charAt(6), 10) * 4 +
              parseInt(value.charAt(7), 10) * 3 +
              parseInt(value.charAt(8), 10) * 2;
            const r = n - (n / 11) * 11;
            if (
              (r === 0 && r === c) ||
              (r === 1 && c === 1) ||
              (r > 1 && c === 11 - r)
            ) {
              return true;
            }
            return false;
          }
          return false;
        },
      },
    });
  };
}
