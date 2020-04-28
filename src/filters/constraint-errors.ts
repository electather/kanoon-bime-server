/* eslint-disable camelcase */

interface IConstraintErrors {
  [constraintKey: string]: string;
}

export const ConstraintErrors: IConstraintErrors = {
  UQ_d289ce58b5cc8025f8c5cf07b62: 'error.unique.melliCode',
  UQ_ae7eebf9a71df8ff4347be2c508: 'error.unique.bimeNumber',
  UQ_7efd9c1bb173ad856ae317bd43d: 'error.unique.engineNumber',
  UQ_90d5b70f93e2d5e4517020c2dff: 'error.unique.chassisNumber',
  UQ_a000cca60bcf04454e727699490: 'error.unique.phoneNumber',
  UQ_c99d719f9481f500c7a71707f51: 'error.unique.bimeNumber',
};
