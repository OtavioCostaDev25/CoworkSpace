import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  @IsNotEmpty()
  roomId!: string;

  @IsDateString()
  startsAt!: string;

  @IsDateString()
  endsAt!: string;
}
