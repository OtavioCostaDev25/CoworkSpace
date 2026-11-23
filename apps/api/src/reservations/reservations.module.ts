import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { PrismaService } from '../prisma.service';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { ReservationsGateway } from './reservations.gateway';

@Module({
  imports: [AuthModule, NotificationsModule],
  controllers: [ReservationsController],
  providers: [PrismaService, ReservationsService, ReservationsGateway],
})
export class ReservationsModule {}
