#!/bin/bash

# Script de deploy automático para o VPS
# Executado pelo GitHub Actions

set -e  # Falha se qualquer comando retornar erro

DATABASE_URL="${1}"
REDIS_URL="${2}"

echo "========================================="
echo "Deploy do Terral Social iniciado"
echo "========================================="

cd /opt/terralsocial || { echo "Erro: Diretorio nao encontrado"; exit 1; }

echo "Atualizando codigo do repositorio..."
git fetch origin main
git reset --hard origin/main

echo "Configurando variaveis de ambiente..."
cat > .env << EOF
DATABASE_URL=${DATABASE_URL}
REDIS_URL=${REDIS_URL}
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
EOF

echo "Parando containers existentes..."
docker-compose down --remove-orphans || echo "Nenhum container rodando"

echo "Limpando recursos Docker..."
docker system prune -f || true

echo "Baixando imagens atualizadas..."
docker-compose pull postgres redis || echo "Imagens ja atualizadas"

echo "Buildando e iniciando containers..."
docker-compose up -d --build

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
docker-compose ps

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
