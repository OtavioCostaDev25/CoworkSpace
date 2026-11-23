import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateRoomDto {
  @IsString() @IsNotEmpty() name!: string;
  @Type(() => Number) @IsInt() @Min(1) capacity!: number;
  @Type(() => Number) @IsNumber() @Min(0) hourlyRate!: number;
}
