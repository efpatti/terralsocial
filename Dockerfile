# Dockerfile Otimizado para Next.js Standalone

# Permite escolher a imagem base do Node via build-arg (fallback fácil em caso de timeout no registry)
ARG NODE_IMAGE=node:22-alpine

# =================================
# Estágio 1: Dependências
# =================================
FROM ${NODE_IMAGE} AS deps
WORKDIR /app

# Copiar apenas os arquivos de manifesto de dependência
COPY package.json package-lock.json* ./

# Copiar o schema do Prisma
COPY prisma ./prisma

# Instalar TODAS as dependências (inclui dev) para permitir o build com Tailwind/PostCSS
# Evita rodar "postinstall" do Prisma neste estágio (que baixa binários) para não falhar por rede
ENV PRISMA_SKIP_POSTINSTALL=1
# Também ignora scripts para garantir que nada faça download durante a instalação
RUN npm ci --ignore-scripts

# =================================
# Estágio 2: Build
# =================================
FROM ${NODE_IMAGE} AS builder
WORKDIR /app

# Variáveis necessárias para o build (Next.js/Prisma leem env.ts durante o build)
# Podem ser sobrescritas via --build-arg. Defaults seguros para build offline.
ARG DATABASE_URL=postgresql://user:pass@localhost:5432/db?schema=public
ARG NEXT_PUBLIC_APP_URL=http://localhost:3000
ARG NEXTAUTH_URL=http://localhost:3000
ARG NEXTAUTH_SECRET=change-this-secret-in-production

# Tornar disponíveis no ambiente do estágio de build
ENV DATABASE_URL=${DATABASE_URL}
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
ENV NEXTAUTH_URL=${NEXTAUTH_URL}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}

# Copiar dependências do estágio anterior (inclui devDependencies)
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/prisma ./prisma

# Copiar o restante do código-fonte
COPY . .

# Gerar Prisma Client (essencial antes do build) com tentativas de retry (rede instável)
RUN set -eux; \
	for i in 1 2 3 4 5; do \
		npx prisma generate && break || { echo "prisma generate failed (attempt $i), retrying in 5s..."; sleep 5; }; \
	done

# Build da aplicação
RUN npm run build

# =================================
# Estágio 3: Produção
# =================================
FROM ${NODE_IMAGE} AS runner
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
# Copiar schema do Prisma para produção
COPY --from=builder /app/prisma ./prisma

# Mudar para o usuário não-root
USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Comando para iniciar o servidor
CMD ["node", "server.js"]
