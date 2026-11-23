import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateWorkspaceDto {
  @IsString() @IsNotEmpty() name!: string;
  @IsString() @IsNotEmpty() address!: string;
  @IsOptional() @IsString() description?: string;
}
