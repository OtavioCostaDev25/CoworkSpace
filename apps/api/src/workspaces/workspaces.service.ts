import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';

@Injectable()
export class WorkspacesService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.workspace.findMany({ include: { rooms: true }, orderBy: { name: 'asc' } });
  }

  create(dto: CreateWorkspaceDto) {
    return this.prisma.workspace.create({ data: dto, include: { rooms: true } });
  }

  createRoom(workspaceId: string, dto: CreateRoomDto) {
    return this.prisma.room.create({ data: { workspaceId, ...dto } });
  }

  get(workspaceId: string) {
    return this.prisma.workspace.findUnique({ where: { id: workspaceId }, include: { rooms: true } });
  }
}
