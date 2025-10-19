# Dockerfile Otimizado para Next.js Standalone

# =================================
# Estágio 1: Dependências
# =================================
FROM node:22-alpine AS deps
WORKDIR /app

# Copiar apenas os arquivos de manifesto de dependência
COPY package.json package-lock.json* ./

# Copiar o schema do Prisma
COPY prisma ./prisma

# Instalar TODAS as dependências (inclui dev) para permitir o build com Tailwind/PostCSS
# Obs: a imagem final de produção continua enxuta pois copiamos apenas o standalone
RUN npm ci

# =================================
# Estágio 2: Build
# =================================
FROM node:22-alpine AS builder
WORKDIR /app

# Copiar dependências do estágio anterior (inclui devDependencies)
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/prisma ./prisma

# Copiar o restante do código-fonte
COPY . .

# Gerar Prisma Client (essencial antes do build)
RUN npx prisma generate

# Build da aplicação
RUN npm run build

# =================================
# Estágio 3: Produção
# =================================
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Criar usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar artefatos do build do estágio 'builder'
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Mudar para o usuário não-root
USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Comando para iniciar o servidor
CMD ["node", "server.js"]
