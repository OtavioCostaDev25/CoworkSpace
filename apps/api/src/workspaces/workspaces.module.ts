import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../prisma.service';
import { WorkspacesController } from './workspaces.controller';
import { WorkspacesService } from './workspaces.service';

@Module({ imports: [AuthModule], controllers: [WorkspacesController], providers: [PrismaService, WorkspacesService] })
export class WorkspacesModule {}
