#!/bin/bash

# Script de deploy automático para o VPS
# Executado pelo GitHub Actions

set -e  # Falha se qualquer comando retornar erro

DATABASE_URL="${1}"
REDIS_URL="${2}"
POSTGRES_USER="${3:-terral}"
POSTGRES_PASSWORD="${4:-terral_password}"
POSTGRES_DB="${5:-terralsocial}"
NEXT_PUBLIC_APP_URL="${6:-http://localhost:3000}"
MERCADOPAGO_ACCESS_TOKEN="${7:-}"
MERCADOPAGO_PUBLIC_KEY="${8:-}"

echo "========================================="
echo "Deploy do Terral Social iniciado"
echo "========================================="

cd /opt/terralsocial || { echo "Erro: Diretorio nao encontrado"; exit 1; }

echo "Atualizando codigo do repositorio..."
git fetch origin main
git reset --hard origin/main

echo "Configurando variaveis de ambiente..."
cat > .env << EOF
# Aplicação
DATABASE_URL=${DATABASE_URL}
REDIS_URL=${REDIS_URL}
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}

# PostgreSQL (para o container)
POSTGRES_USER=${POSTGRES_USER}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
POSTGRES_DB=${POSTGRES_DB}

# MercadoPago (opcional)
MERCADOPAGO_ACCESS_TOKEN=${MERCADOPAGO_ACCESS_TOKEN}
MERCADOPAGO_PUBLIC_KEY=${MERCADOPAGO_PUBLIC_KEY}
EOF

echo "Parando containers existentes..."
docker compose down --remove-orphans || echo "Nenhum container rodando"

echo "Limpando recursos Docker..."
docker system prune -f || true

echo "Baixando imagens atualizadas..."
docker compose pull postgres redis || echo "Imagens ja atualizadas"

echo "Buildando e iniciando containers..."
docker compose up -d --build

echo "Aguardando PostgreSQL iniciar..."
for i in {1..30}; do
  if docker exec terralsocial-postgres pg_isready -U terral > /dev/null 2>&1; then
    echo "PostgreSQL pronto!"
    break
  fi
  if [ $i -eq 30 ]; then
    echo "Timeout aguardando PostgreSQL"
    exit 1
  fi
  sleep 2
done

echo "Executando migrations do banco..."
docker exec terralsocial-nextjs npx prisma db push --skip-generate || echo "Migrations ja aplicadas"

echo "Verificando status dos containers..."
docker compose ps

sleep 5

if [ "$(docker ps -q -f name=terralsocial-nextjs)" ]; then
  echo "Container Next.js rodando"
else
  echo "Erro: Container Next.js nao iniciou"
  docker logs terralsocial-nextjs --tail 50
  exit 1
fi

if [ "$(docker ps -q -f name=terralsocial-postgres)" ]; then
  echo "Container PostgreSQL rodando"
fi

if [ "$(docker ps -q -f name=terralsocial-redis)" ]; then
  echo "Container Redis rodando"
fi

echo "Logs do Next.js:"
docker logs terralsocial-nextjs --tail 20

echo "========================================="
echo "Deploy concluido com sucesso!"
echo "========================================="
