import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
@UseGuards(JwtAuthGuard)
export class ReservationsController {
  constructor(private readonly reservations: ReservationsService) {}

  @Post()
  create(@Req() request: { user: { id: string } }, @Body() dto: CreateReservationDto) {
    return this.reservations.create(request.user.id, dto);
  }

  @Get('mine')
  mine(@Req() request: { user: { id: string } }) {
    return this.reservations.findForUser(request.user.id);
  }
}
