import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

@Processor('notifications')
export class NotificationsProcessor extends WorkerHost {
  private readonly logger = new Logger(NotificationsProcessor.name);

  async process(job: Job<{ type: string; recipient: string; message: string }>) {
    this.logger.log(`Processando notificação ${job.name} para ${job.data.recipient}`);
    // Ponto de extensão para e-mail, push ou WhatsApp sem bloquear a API.
    return { delivered: true, type: job.data.type };
  }
}
