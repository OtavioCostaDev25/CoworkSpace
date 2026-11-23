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
pnpm --filter @coworkspace/api prisma:seed
```

## Teste visual local

Com Docker Desktop ativo:

```bash
docker compose up -d
pnpm --filter @coworkspace/api prisma:migrate --name init
pnpm --filter @coworkspace/api prisma:seed
pnpm dev
```

Abra `http://localhost:3001`, crie uma conta ou use `demo@coworkspace.local`
com a senha `Cowork123!`. A documentação da API fica em `http://localhost:3000/docs`.
