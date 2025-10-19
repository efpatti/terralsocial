# 🗄️ Setup do Banco de Dados - Terral Social

Este guia explica como configurar o banco de dados PostgreSQL com Prisma ORM para o projeto Terral Social.

## 📋 Pré-requisitos

- Node.js 22+
- Docker e Docker Compose
- PostgreSQL (via Docker)

## 🚀 Setup Local (Desenvolvimento)

### 1. Instalar Dependências

```bash
npm install
```

Isso instalará:

- `@prisma/client` - Cliente Prisma para acesso ao banco
- `prisma` - CLI do Prisma
- `zod` - Validação de dados

### 2. Iniciar Banco de Dados com Docker

```bash
# Iniciar PostgreSQL e Redis locais
docker-compose -f docker-compose.dev.yml up -d

# Verificar se estão rodando
docker ps
```

Isso iniciará:

- PostgreSQL na porta 5432
- Redis na porta 6379

### 3. Configurar Variáveis de Ambiente

```bash
# Copiar arquivo de exemplo
cp .env.example .env.local

# O arquivo .env.local já vem com as configurações corretas:
# DATABASE_URL=postgresql://postgres:password@localhost:5432/terralsocial
```

### 4. Gerar Prisma Client e Criar Tabelas

```bash
# Gerar Prisma Client
npx prisma generate

# Criar tabelas no banco (sem migrations)
npx prisma db push

# OU usar o script npm
npm run db:setup
```

### 5. (Opcional) Abrir Prisma Studio

```bash
# Interface visual para o banco de dados
npx prisma studio

# Abre em http://localhost:5555
```

### 6. Rodar a Aplicação

```bash
npm run dev
```

Acesse: http://localhost:3000

## 🔍 Verificar Funcionamento

### Testar Formulário de Voluntários

1. Acesse: http://localhost:3000/como-ajudar/seja-voluntario
2. Preencha o formulário
3. Envie a inscrição
4. Verifique no Prisma Studio ou logs do terminal

### Ver Dados no Banco

```bash
# Opção 1: Prisma Studio (recomendado)
npx prisma studio

# Opção 2: CLI do Postgres
docker exec -it terralsocial-dev-postgres psql -U postgres -d terralsocial

# Consultar voluntários
SELECT * FROM volunteers;
```

## 📦 Comandos Úteis

```bash
# Desenvolvimento
npm run dev                    # Iniciar servidor de desenvolvimento
npm run db:setup               # Setup completo do banco

# Prisma
npm run prisma:generate        # Gerar Prisma Client
npm run prisma:push            # Aplicar schema ao banco (sem migrations)
npm run prisma:studio          # Abrir Prisma Studio
npm run prisma:migrate         # Criar migration (produção)

# Docker
docker-compose -f docker-compose.dev.yml up -d     # Iniciar serviços
docker-compose -f docker-compose.dev.yml down      # Parar serviços
docker-compose -f docker-compose.dev.yml logs -f   # Ver logs
```

## 🏗️ Schema do Banco

```prisma
model Volunteer {
  id           Int      @id @default(autoincrement())
  name         String
  email        String   @unique
  phone        String
  area         String
  availability String
  experience   String?
  message      String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

## 🌐 Deploy em Produção (VPS)

### Configuração Automática via GitHub Actions

O deploy automático já está configurado no workflow `.github/workflows/deploy.yml`.

**Secrets necessárias no GitHub** (já configuradas):

- `DATABASE_URL` - URL do PostgreSQL na VPS
- `REDIS_URL` - URL do Redis na VPS
- `SSH_HOST` - IP do VPS
- `SSH_USER` - Usuário SSH
- `SSH_KEY` - Chave privada SSH

### O que acontece no deploy:

1. ✅ Build da imagem Docker com Prisma Client
2. ✅ Deploy via SSH no VPS
3. ✅ Containers sobem com Docker Compose
4. ✅ Migrations aplicadas automaticamente
5. ✅ Aplicação pronta para uso

### Comandos no VPS

```bash
# SSH no VPS
ssh root@<IP_VPS>

# Navegar para o projeto
cd /opt/terralsocial

# Ver logs
docker logs terralsocial-nextjs -f

# Executar migrations manualmente
docker exec terralsocial-nextjs npx prisma db push

# Acessar banco de dados
docker exec -it terralsocial-postgres psql -U terral -d terralsocial

# Ver voluntários
SELECT * FROM volunteers;
```

## 🔧 Troubleshooting

### Erro: "Cannot find module '@prisma/client'"

```bash
npx prisma generate
```

### Erro: "Error connecting to database"

```bash
# Verificar se PostgreSQL está rodando
docker ps | grep postgres

# Reiniciar container
docker-compose -f docker-compose.dev.yml restart postgres

# Verificar logs
docker logs terralsocial-dev-postgres
```

### Erro: "Table volunteers does not exist"

```bash
# Aplicar schema ao banco
npx prisma db push
```

### Limpar banco e recomeçar

```bash
# Parar containers
docker-compose -f docker-compose.dev.yml down -v

# Iniciar novamente
docker-compose -f docker-compose.dev.yml up -d

# Recriar tabelas
npx prisma db push
```

## 📊 Estrutura de Arquivos

```
terralsocial/
├── prisma/
│   └── schema.prisma           # Schema do banco de dados
├── src/
│   ├── app/
│   │   └── api/
│   │       └── volunteers/
│   │           └── route.ts    # API endpoint
│   └── lib/
│       ├── prisma.ts           # Cliente Prisma singleton
│       └── env.ts              # Validação de variáveis de ambiente
├── docker-compose.dev.yml      # Docker para desenvolvimento
├── docker-compose.yml          # Docker para produção
├── .env.local                  # Variáveis locais (não commitado)
└── .env.example                # Exemplo de variáveis
```

## 🔐 Segurança

- ✅ Validação de dados com Zod
- ✅ Sanitização automática do Prisma
- ✅ Proteção contra SQL Injection
- ✅ Variáveis de ambiente separadas por ambiente
- ✅ Secrets gerenciadas pelo GitHub

## 📚 Recursos

- [Prisma Documentation](https://www.prisma.io/docs)
- [Zod Documentation](https://zod.dev)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [PostgreSQL Docker Hub](https://hub.docker.com/_/postgres)

---

**Desenvolvido com ❤️ para Terral Social**
