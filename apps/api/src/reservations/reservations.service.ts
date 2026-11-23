import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { ReservationsGateway } from './reservations.gateway';

@Injectable()
export class ReservationsService {
  constructor(private readonly prisma: PrismaService, private readonly notifications: NotificationsService, private readonly gateway: ReservationsGateway) {}

  async create(userId: string, dto: CreateReservationDto) {
    const startsAt = new Date(dto.startsAt);
    const endsAt = new Date(dto.endsAt);

    if (startsAt >= endsAt) {
      throw new ConflictException('O horário final deve ser posterior ao inicial.');
    }

    const room = await this.prisma.room.findUnique({ where: { id: dto.roomId } });
    if (!room) {
      throw new ConflictException('Sala não encontrada.');
    }

    const conflict = await this.prisma.reservation.findFirst({
      where: {
        roomId: dto.roomId,
        status: { in: ['PENDING', 'CONFIRMED'] },
        startsAt: { lt: endsAt },
        endsAt: { gt: startsAt },
      },
    });

    if (conflict) {
      throw new ConflictException('A sala já está reservada nesse intervalo.');
    }

    const reservation = await this.prisma.reservation.create({
      data: { userId, roomId: dto.roomId, startsAt, endsAt },
      include: { room: true, user: true },
    });
    await this.notifications.enqueueReservationCreated(reservation.user.email, reservation.id);
    this.gateway.reservationCreated({ id: reservation.id, roomId: reservation.roomId, startsAt: reservation.startsAt, endsAt: reservation.endsAt });
    return reservation;
  }

  findForUser(userId: string) {
    return this.prisma.reservation.findMany({
      where: { userId },
      include: { room: { include: { workspace: true } } },
      orderBy: { startsAt: 'asc' },
    });
  }
}
