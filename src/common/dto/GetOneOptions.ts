import { IsArray, IsOptional, IsString } from 'class-validator';

export class GetOneOptions {
  @IsOptional()
  @IsArray({ message: 'error.fields.must-be-array' })
  @IsString({ each: true, message: 'error.fields.must-be-string' })
  fields: string[];
}
