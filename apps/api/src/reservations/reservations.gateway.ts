import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: 'reservations', cors: { origin: '*' } })
export class ReservationsGateway {
  @WebSocketServer()
  server!: Server;

  reservationCreated(reservation: { id: string; roomId: string; startsAt: Date; endsAt: Date }) {
    this.server.emit('reservation.created', reservation);
  }
}
