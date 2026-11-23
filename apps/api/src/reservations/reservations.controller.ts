import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AvailabilityDto } from './dto/availability.dto';
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

  @Get('rooms/:roomId/availability')
  availability(@Param('roomId') roomId: string, @Query() dto: AvailabilityDto) {
    return this.reservations.availability(roomId, dto);
  }

  @Delete(':id')
  cancel(@Req() request: { user: { id: string } }, @Param('id') id: string) {
    return this.reservations.cancel(request.user.id, id);
  }
}
