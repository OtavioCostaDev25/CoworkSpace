import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class NotificationsService {
  constructor(@InjectQueue('notifications') private readonly queue: Queue) {}

  enqueueReservationCreated(recipient: string, reservationId: string) {
    return this.queue.add('reservation.created', {
      type: 'reservation.created', recipient, reservationId,
      message: 'Sua solicitação de reserva foi recebida.',
    }, { attempts: 3, backoff: { type: 'exponential', delay: 1000 }, removeOnComplete: true });
  }
}
