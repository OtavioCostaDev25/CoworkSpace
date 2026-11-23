import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET ?? 'change-me-in-development', signOptions: { expiresIn: '1d' } })],
  controllers: [AuthController],
  providers: [PrismaService, AuthService, JwtAuthGuard],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
