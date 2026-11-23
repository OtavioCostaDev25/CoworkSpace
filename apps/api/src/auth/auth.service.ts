import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { PrismaService } from '../prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) {}

  async register(dto: RegisterDto) {
    const email = dto.email.toLowerCase();
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new ConflictException('E-mail já cadastrado.');

    const user = await this.prisma.user.create({
      data: { name: dto.name, email, passwordHash: await hash(dto.password, 12) },
    });
    return this.issueToken(user.id, user.email, user.role);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email.toLowerCase() } });
    if (!user || !(await compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }
    return this.issueToken(user.id, user.email, user.role);
  }

  private issueToken(id: string, email: string, role: string) {
    return { accessToken: this.jwt.sign({ sub: id, email, role }) };
  }
}
