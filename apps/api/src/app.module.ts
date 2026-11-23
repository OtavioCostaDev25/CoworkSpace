import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './health.controller';
import { PrismaService } from './prisma.service';
import { ReservationsModule } from './reservations/reservations.module';
import { AuthModule } from './auth/auth.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { BullModule } from '@nestjs/bullmq';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), BullModule.forRoot({ connection: { url: process.env.REDIS_URL ?? 'redis://localhost:6379' } }), AuthModule, ReservationsModule, WorkspacesModule, NotificationsModule],
  controllers: [HealthController],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
