# Dockerfile para Next.js com output: export (static export)
FROM node:22-alpine AS base

# 1. Instalar dependências apenas quando necessário
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Instalar dependências baseado no gerenciador de pacotes preferido
COPY package.json package-lock.json* ./
# Copiar schema do Prisma antes de npm ci (necessário para o postinstall)
COPY prisma ./prisma
RUN npm ci

# 2. Rebuildar o código-fonte apenas quando necessário
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Desabilitar telemetria durante o build
ENV NEXT_TELEMETRY_DISABLED=1

# Gerar Prisma Client antes do build
RUN npx prisma generate

# Build do Next.js que gera a pasta 'out' com arquivos estáticos
RUN npm run build

# 3. Imagem de produção: servir arquivos estáticos com serve
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Criar usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Instalar 'serve' globalmente para servir arquivos estáticos
RUN npm install -g serve

# Copiar os arquivos estáticos buildados da etapa anterior
COPY --from=builder --chown=nextjs:nodejs /app/out ./out

USER nextjs

EXPOSE 3000

ENV PORT=3000

# Comando para servir os arquivos estáticos
CMD ["serve", "out", "-l", "3000"]
