# GitHub Actions Setup Guide

Guia completo para configurar e usar os workflows de CI/CD do Terral Social.

## ⚡ Quick Start

### 1. Configurar Secrets no GitHub

1. Vá para: **Settings → Secrets and variables → Actions**
2. Clique em "New repository secret"
3. Configure cada secret abaixo:

#### VPS Production

```
VPS_HOST = 192.168.1.100          # IP ou domínio
VPS_USER = deploy_user             # Username SSH
VPS_SSH_KEY = -----BEGIN PRIVATE KEY-----
                [sua chave privada aqui]
              -----END PRIVATE KEY-----
```

#### Database

```
DATABASE_URL = postgresql://terral:senha123@localhost:5432/terralsocial
POSTGRES_USER = terral
POSTGRES_PASSWORD = senha123
POSTGRES_DB = terralsocial
REDIS_URL = redis://localhost:6379
```

#### Aplicação

```
NEXT_PUBLIC_APP_URL = http://seu-dominio.com
MERCADOPAGO_ACCESS_TOKEN = SEU_TOKEN_AQUI
MERCADOPAGO_PUBLIC_KEY = SEU_PUBLIC_KEY_AQUI
```

#### Docker Hub (opcional, para pushes automáticos)

```
DOCKER_USERNAME = seu_usuario
DOCKER_PASSWORD = seu_token_acesso
```

### 2. Gerar SSH Key (se não tiver)

```bash
# No seu computador local
ssh-keygen -t ed25519 -f ~/.ssh/deploy_key -N ""

# Ver a chave privada (copiar para secret)
cat ~/.ssh/deploy_key

# Copiar chave pública para o VPS
ssh-copy-id -i ~/.ssh/deploy_key.pub deploy_user@192.168.1.100
```

### 3. Testar Conexão

```bash
# Verificar se consegue conectar
ssh -i ~/.ssh/deploy_key deploy_user@192.168.1.100 "docker --version"

# Deve retornar algo como: Docker version 24.0.0
```

---

## 📋 Workflows Disponíveis

### 1️⃣ CI - Build and Test

- **Arquivo:** `.github/workflows/ci.yml`
- **Trigger:** `push` em main/develop, `pull_request`
- **Duração:** ~5-10 minutos
- **Status:** Deve passar para qualquer PR

```bash
# Executar localmente para testar antes de push
npm run lint
npm run build
npm run test
```

### 2️⃣ Tests - Avançado

- **Arquivo:** `.github/workflows/tests.yml`
- **Trigger:** `push` em main/develop, `pull_request`
- **Duração:** ~15-20 minutos
- **Testes:** Integration, E2E, Performance, Security

```bash
# Executar testes localmente
npm run test:integration    # Se configurado
npm run test:e2e           # Se configurado
```

### 3️⃣ CD - Deployment

- **Arquivo:** `.github/workflows/cd.yml`
- **Trigger:** Conclusão bem-sucedida do CI
- **Duração:** ~20-30 minutos
- **Automático:** Não requer ação manual

```
✅ CI passa → 💾 Backup → 🔄 Update repo → 🔨 Build →
✅ Health checks → 🌐 Verificação final → ✅ Deploy OK
```

### 4️⃣ Release - Manual

- **Arquivo:** `.github/workflows/release.yml`
- **Trigger:** Manual (`workflow_dispatch`)
- **Opções:** patch/minor/major/hotfix → staging/production

**Para fazer release:**

1. Actions → Release and Deployment
2. Run workflow
3. Escolher versão e ambiente
4. Confirmar (approvals para prod)

### 5️⃣ Health Check - Monitoramento

- **Arquivo:** `.github/workflows/health-check.yml`
- **Trigger:** A cada 30 minutos + manual
- **Duração:** ~5 minutos
- **Ações:** Monitora saúde da aplicação

```
Se falhar → Cria issue automaticamente
Label: health-check, urgent
```

---

## 🎯 Uso Diário

### Para desenvolvedores:

#### Antes de commitar:

```bash
git status
npm run lint      # Verificar código
npm run build     # Garantir build
npm run test      # Rodar testes

git add .
git commit -m "feat: descrição clara"
```

#### Fazer push:

```bash
git push origin main
```

#### Monitorar workflow:

1. Vá para GitHub → Actions
2. Procure o seu commit
3. Espere concluir (verde = sucesso)

### Para DevOps/Releases:

#### Fazer release:

```bash
1. Actions → Release and Deployment → Run workflow
2. Selecione release_type: minor
3. Selecione target_environment: staging
4. Espere testes em staging
5. Repita para production (com approval)
```

#### Monitorar health:

```bash
1. Actions → Health Check
2. Procure a última execução
3. Veja status de cada verificação
```

---

## 🔍 Monitorando Workflows

### No GitHub:

1. **Ir para Actions**

   ```
   GitHub → Actions
   ```

2. **Filtrar por workflow**

   ```
   Todos → [selecionar workflow]
   ```

3. **Ver detalhes**

   ```
   Clicar no run → Ver steps
   ```

4. **Acessar logs**
   ```
   Step → Expandir → Ver logs detalhados
   ```

### Interpretando Status:

- ✅ **Success** - Tudo OK
- ⏳ **In Progress** - Aguarde conclusão
- ❌ **Failed** - Algo deu errado
- ⏭️ **Skipped** - Condição não atingida
- ⚠️ **Warning** - Alertas (não bloqueia)

---

## 🐛 Troubleshooting

### CI está falhando

**Problema:** Lint/Build falhando no GitHub mas OK localmente

**Solução:**

```bash
# Limpar cache local
rm -rf node_modules package-lock.json
npm install

# Rodar os testes exatos
npm run lint
npm run build
npm run test
```

**Problema:** TypeScript errors

```bash
# Verificar tipos
npx tsc --noEmit
```

---

### CD está falhando

**Problema:** Erro de conexão SSH

**Solução:**

1. Verificar VPS_SSH_KEY está correto
2. Testar localmente:
   ```bash
   ssh -i seu_chave deploy_user@VPS_HOST "echo OK"
   ```

**Problema:** Docker command not found no VPS

**Solução:**

1. SSH no VPS
   ```bash
   ssh deploy_user@VPS_HOST
   ```
2. Instalar Docker:
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   ```

**Problema:** Espaço em disco cheio

**Solução:**

1. SSH no VPS
2. Verificar espaço:
   ```bash
   df -h
   ```
3. Limpar Docker:
   ```bash
   docker system prune -a
   ```

---

### Rollback automático não acionado

**Verificar:**

```bash
# Health check falhou
# Logs mostram erro

# Rodar rollback manual se necessário
ssh deploy_user@VPS_HOST "cd /opt/terralsocial && git reset --hard HEAD~1 && docker compose up -d"
```

---

## 📊 Visualizar Status

### Badge de Status

Adicione ao README.md:

```markdown
![CI](https://github.com/efpatti/terralsocial/workflows/CI%20-%20Build%20and%20Test/badge.svg)
![CD](https://github.com/efpatti/terralsocial/workflows/CD%20-%20Deploy%20to%20Production/badge.svg)
![Health](https://github.com/efpatti/terralsocial/workflows/Health%20Check%20and%20Monitoring/badge.svg)
```

---

## 🔐 Security Best Practices

1. **Secrets seguros:**

   - Nunca commitar .env
   - Usar secrets no GitHub
   - Rotacionar chaves periodicamente

2. **SSH Keys:**

   - Usar Ed25519 (mais seguro)
   - Sem passphrase em CI
   - Deploy user com perms limitadas

3. **Dependências:**

   - `npm audit` roda automaticamente
   - Verificar vulnerabilidades
   - Atualizar packages regularmente

4. **Logs:**
   - Não expor secrets nos logs
   - Mascarar dados sensíveis
   - Revisar logs públicos

---

## ✅ Checklist de Setup

- [ ] SSH key gerada e testada
- [ ] Secrets configurados no GitHub
- [ ] Conexão SSH ao VPS funcionando
- [ ] Docker e Docker Compose no VPS
- [ ] .env configurado no VPS
- [ ] Banco de dados acessível
- [ ] First CI passa (verde)
- [ ] Primeiro deploy bem-sucedido
- [ ] Health check monitora OK
- [ ] Alerts configurados

---

## 📞 Debug Commands

```bash
# Ver GitHub Actions logs (require CLI)
gh run list
gh run view RUN_ID --log
gh run view RUN_ID --log > debug.log

# SSH no VPS para debug
ssh deploy_user@VPS_HOST

# Docker logs
docker compose logs -f
docker logs container_name --tail 50

# Verificar espaço
df -h
docker system df

# Testar aplicação
curl http://localhost:3000
curl -v http://localhost:3000

# Backup manual
docker exec terralsocial-postgres pg_dump -U terral terralsocial | gzip > backup.sql.gz
```

---

## 📚 Recursos Adicionais

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [appleboy/ssh-action](https://github.com/appleboy/ssh-action)
- [Docker Compose Docs](https://docs.docker.com/compose/)
- [Prisma Migrations](https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/what-is-prisma-migrate)

---

**Última atualização:** Outubro 2025
**Versão:** 1.0.0
