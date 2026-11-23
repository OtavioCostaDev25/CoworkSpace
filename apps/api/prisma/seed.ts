import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'demo@coworkspace.local' },
    update: {},
    create: { name: 'Usuário Demo', email: 'demo@coworkspace.local', passwordHash: await hash('Cowork123!', 12) },
  });

  const workspace = await prisma.workspace.upsert({
    where: { id: 'demo-workspace' },
    update: {},
    create: { id: 'demo-workspace', name: 'Cowork Central', address: 'Av. Principal, 100', description: 'Espaço demonstrativo do CoworkSpace' },
  });

  await prisma.room.upsert({
    where: { id: 'demo-room' },
    update: {},
    create: { id: 'demo-room', workspaceId: workspace.id, name: 'Sala Aurora', capacity: 8, hourlyRate: 45 },
  });

  console.log(`Dados demo prontos para ${user.email}`);
}

main().finally(() => prisma.$disconnect());
