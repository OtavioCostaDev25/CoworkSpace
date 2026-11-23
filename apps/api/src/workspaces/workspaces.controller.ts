import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateRoomDto } from './dto/create-room.dto';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspacesService } from './workspaces.service';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspaces: WorkspacesService) {}

  @Get()
  list() { return this.workspaces.list(); }

  @Get(':id')
  get(@Param('id') id: string) { return this.workspaces.get(id); }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateWorkspaceDto) { return this.workspaces.create(dto); }

  @Post(':id/rooms')
  @UseGuards(JwtAuthGuard)
  createRoom(@Param('id') id: string, @Body() dto: CreateRoomDto) { return this.workspaces.createRoom(id, dto); }
}
