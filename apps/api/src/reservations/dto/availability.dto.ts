import { IsDateString } from 'class-validator';

export class AvailabilityDto {
  @IsDateString()
  startsAt!: string;

  @IsDateString()
  endsAt!: string;
}
