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
          if (value.length !== 10 || /(\d)(\1){9}/.test(value)) {
            return false;
          }

          let sum = 0;
          const chars = value.split('');

          for (let i = 0; i < 9; i++) {
            sum += +chars[i] * (10 - i);
          }

          const remainder = sum % 11;

          const lastDigit = remainder < 2 ? remainder : 11 - remainder;

          return +chars[9] === lastDigit;
        },
      },
    });
  };
}

export function IsCellNumber(
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
          return /^9[0|1|2|3][0-9]{8}$/.test(value);
        },
      },
    });
  };
}
