import { IsArray, IsString } from 'class-validator';

export class GetOneOptions {
  @IsArray({ message: 'error.fields.must-be-array' })
  @IsString({ each: true, message: 'error.fields.must-be-string' })
  fields: string[];
}
