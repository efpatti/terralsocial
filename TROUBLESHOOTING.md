# Troubleshooting - Deploy Terral Social

## ❌ Deploy Falha em ~40 Segundos (SSH Timeout)

### Problema

O GitHub Actions falha rapidamente ao tentar conectar no VPS via SSH.

### Possíveis Causas

#### 1. **VPS Offline ou Não Respondendo**

```bash
# Teste sua conectividade:
ping -c 4 VPS_HOST

# Teste SSH manualmente:
ssh -v -i ~/.ssh/private_key user@VPS_HOST 'echo OK'
```

#### 2. **SSH Key Inválida ou em Formato Errado**

A secret `VPS_SSH_KEY` deve conter sua chave privada SSH em um formato específico.

**Para gerar e usar corretamente:**

```bash
# Gerar nova chave SSH (se não tiver):
ssh-keygen -t rsa -b 4096 -f ~/.ssh/vps_key -N ""

# Ver o conteúdo da chave privada:
cat ~/.ssh/vps_key

# Copiar para clipboard (no macOS):
cat ~/.ssh/vps_key | pbcopy

# Copiar para clipboard (no Linux):
cat ~/.ssh/vps_key | xclip -selection clipboard
```

**Para configurar no GitHub:**

1. Acesse: https://github.com/efpatti/terralsocial/settings/secrets/actions
2. Clique em "New repository secret"
3. Name: `VPS_SSH_KEY`
4. Value: Cole o **conteúdo completo** da sua chave privada (incluindo `-----BEGIN` e `-----END`)

**Importante:** A chave deve estar **sem passphrase** ou a action não conseguirá usar.

#### 3. **Verificar se a Chave Pública Está no VPS**

```bash
# No seu computador, gere a chave pública da chave privada:
ssh-keygen -y -f ~/.ssh/vps_key > ~/.ssh/vps_key.pub

# No VPS, adicione a chave pública:
cat ~/.ssh/vps_key.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

#### 4. **Permissões SSH no VPS**

```bash
# Conecte no VPS e execute:
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

## ⚠️ Deploy Falha Durante o Build (Dockerfile)

### Erro: "not found" ao copiar arquivos

**Causa:** O Next.js não conseguiu fazer o build corretamente.

**Solução:**

1. Verifique o arquivo `next.config.ts`:

```typescript
output: "standalone";
```

2. Verifique o Dockerfile está otimizado:

```bash
git diff HEAD~1 Dockerfile
```

3. Limpe o cache do Docker:

```bash
docker system prune -a --volumes
```

## 🛑 Container Next.js Não Inicia

### Debug no VPS

```bash
cd /opt/terralsocial

# Ver logs do container:
docker logs terralsocial-nextjs --tail=100

# Ver logs em tempo real:
docker logs -f terralsocial-nextjs

# Conectar dentro do container:
docker exec -it terralsocial-nextjs /bin/sh

# Dentro do container, verificar se o server.js existe:
ls -la server.js .next/
```

## 🗄️ PostgreSQL Não Inicia

### Debug

```bash
cd /opt/terralsocial

# Ver logs:
docker logs terralsocial-postgres --tail=100

# Verificar se a porta está em uso:
netstat -tlnp | grep 5432

# Verificar volumes:
docker volume ls | grep terralsocial

# Verificar permissões do volume:
ls -la $(docker volume inspect terralsocial_postgres-data -f '{{ .Mountpoint }}')
```

## 💾 Resetar o Banco de Dados

**Cuidado:** Isso vai deletar TODOS os dados!

```bash
cd /opt/terralsocial

# Parar containers:
docker compose down

# Remover volumes:
docker volume rm terralsocial_postgres-data terralsocial_redis-data

# Subir containers novamente:
docker compose up -d --build
```

## 📋 Verificações Úteis

### Status Geral

```bash
cd /opt/terralsocial

# Ver todos os containers:
docker compose ps

# Ver recursos usados:
docker stats

# Ver espaço em disco:
df -h

# Ver espaço Docker:
docker system df
```

### Logs

```bash
cd /opt/terralsocial

# Ver todos os logs:
docker compose logs --tail=50

# Ver logs de um serviço específico:
docker compose logs --tail=50 nextjs

# Ver logs de um container:
docker logs terralsocial-nextjs --tail=50

# Seguir logs em tempo real:
docker compose logs -f
```

### Conectividade

```bash
# Testar se a aplicação está respondendo:
curl http://localhost:3000

# Com mais detalhes:
curl -v http://localhost:3000

# De fora do VPS (substitua VPS_HOST):
curl http://VPS_HOST:3000
```

## 🔄 Redeploy Manual

Se o GitHub Actions continuar falhando:

```bash
cd /opt/terralsocial

# Atualizar código:
git fetch origin main
git reset --hard origin/main

# Recriar containers:
docker compose down
docker compose up -d --build

# Executar migrations:
docker exec terralsocial-nextjs npx prisma db push --skip-generate

# Verificar status:
docker compose ps
docker logs terralsocial-nextjs --tail=30
```

## 🆘 Não Sei o Que Fazer

Primeiro execute isso no VPS e compartilhe comigo:

```bash
cd /opt/terralsocial

echo "=== Status dos Containers ==="
docker compose ps

echo ""
echo "=== Recursos Docker ==="
docker system df

echo ""
echo "=== Espaço em Disco ==="
df -h

echo ""
echo "=== Últimos Logs ==="
docker compose logs --tail=100
```

Isso vai me ajudar a identificar o problema!
