# CoworkSpace

Plataforma de reservas de salas e espaços de coworking.

## Stack

- NestJS + TypeScript
- PostgreSQL + Prisma
- Redis + BullMQ (notificações assíncronas)
- Nuxt 3 (frontend, em construção)
- Docker Compose

## Domínio inicial

Usuários reservam salas dentro de espaços de coworking. A API deverá impedir
reservas conflitantes, registrar o status da reserva e publicar eventos para
notificações assíncronas.

## Desenvolvimento

```bash
cp .env.example .env
docker compose up -d
pnpm install
pnpm --filter @coworkspace/api exec prisma generate
pnpm --filter @coworkspace/api exec prisma migrate dev --name init
```
