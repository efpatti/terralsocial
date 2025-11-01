#!/bin/bash

# Script para rodar desenvolvimento localmente (sem build Docker)
# Usa Docker apenas para PostgreSQL e Redis

set -e

echo "🚀 Iniciando desenvolvimento local..."

# Verificar se .env existe
if [ ! -f .env ]; then
  echo "⚠️  Arquivo .env não encontrado. Criando..."
  
  # Gerar NEXTAUTH_SECRET
  NEXTAUTH_SECRET=$(openssl rand -base64 32 2>/dev/null || echo "change-this-secret-$(date +%s)")
  
  cat > .env << EOF
# Database
DATABASE_URL=postgresql://terral:terral_password@localhost:5433/terralsocial

# Redis
REDIS_URL=redis://localhost:6380

# Next.js
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_APP_URL=http://localhost:3000

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=${NEXTAUTH_SECRET}

# MercadoPago (opcional)
MERCADOPAGO_ACCESS_TOKEN=
MERCADOPAGO_PUBLIC_KEY=
EOF
  
  echo "✅ Arquivo .env criado!"
fi

# Iniciar apenas banco de dados e Redis
echo "📦 Iniciando PostgreSQL e Redis..."
docker compose -f docker-compose.dev.yml up -d

# Aguardar PostgreSQL ficar pronto
echo "⏳ Aguardando PostgreSQL..."
for i in {1..30}; do
  if docker exec terralsocial-dev-postgres pg_isready -U postgres > /dev/null 2>&1; then
    echo "✅ PostgreSQL pronto!"
    break
  fi
  if [ $i -eq 30 ]; then
    echo "❌ Timeout aguardando PostgreSQL"
    exit 1
  fi
  sleep 1
done

# Instalar dependências se necessário
if [ ! -d "node_modules" ]; then
  echo "📥 Instalando dependências..."
  npm install
fi

# Gerar Prisma Client
echo "🔧 Gerando Prisma Client..."
npx prisma generate

# Aplicar migrations
echo "🗄️  Aplicando migrations do banco..."
npx prisma db push || echo "⚠️  Erro ao aplicar migrations (pode já estar atualizado)"

echo ""
echo "✅ Tudo pronto!"
echo ""
echo "🌐 Acesse: http://localhost:3000"
echo "📊 Prisma Studio: npm run prisma:studio"
echo ""
echo "Para parar os serviços Docker: docker compose -f docker-compose.dev.yml down"
echo ""

# Iniciar servidor de desenvolvimento
npm run dev

