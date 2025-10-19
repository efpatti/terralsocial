# GitHub Actions Workflows - Terral Social

Documentação completa sobre os workflows de CI/CD do projeto Terral Social.

## 📋 Visão Geral

O projeto utiliza **4 workflows principais** que trabalham juntos para garantir qualidade, segurança e deployment automático:

```
┌─────────────────────────────────────────────────────────────────┐
│                      GitHub Actions Workflows                    │
└─────────────────────────────────────────────────────────────────┘
                                 │
                    ┌────────────┼────────────┐
                    │            │            │
            ┌───────▼────┐ ┌────▼───────┐ ┌──▼──────────┐
            │   CI.yml   │ │  TESTS.yml │ │ RELEASE.yml│
            └───────┬────┘ └────┬───────┘ └──┬─────────┘
                    │           │            │
                    └───────────┼────────────┘
                                │
                        ┌───────▼────────┐
                        │    CD.yml      │
                        └───────┬────────┘
                                │
                    ┌───────────▼───────────┐
                    │ HEALTH-CHECK.yml      │
                    │ (Monitoring contínuo) │
                    └───────────────────────┘
```

---

## 🔄 **1. CI.yml - Continuous Integration**

**Trigger:** Push em `main`/`develop`, Pull Requests

**Propósito:** Validar código, build e testes antes do deploy

### Jobs:

1. **lint** - ESLint + TypeScript
2. **build** - Build da aplicação Next.js
3. **test-unit** - Testes unitários
4. **docker-build** - Build da imagem Docker
5. **security-scan** - Trivy vulnerability scanner
6. **dependency-check** - Audit de dependências
7. **ci-summary** - Resumo geral

### Exemplo de uso:

```bash
# Automático ao fazer push
git push origin main

# O workflow executará:
# ✅ Lint
# ✅ Build
# ✅ Testes
# ✅ Docker build
# ✅ Security scan
```

---

## 🧪 **2. TESTS.yml - Testing Pipeline**

**Trigger:** Push em `main`/`develop`, Pull Requests

**Propósito:** Testes avançados, performance e segurança

### Jobs:

1. **integration-tests** - Com PostgreSQL + Redis
2. **lighthouse-audit** - Performance web (se configurado)
3. **bundle-analysis** - Análise de tamanho
4. **security-tests** - npm audit + secrets detection
5. **e2e-tests** - Testes end-to-end com Playwright
6. **performance-monitoring** - Análise de performance
7. **accessibility-tests** - Testes de acessibilidade
8. **tests-summary** - Resumo

### Requisitos adicionais:

```bash
# Adicione ao package.json:
"scripts": {
  "test": "jest",
  "test:integration": "jest --integration",
  "test:e2e": "playwright test"
}
```

---

## 🚀 **3. CD.yml - Continuous Deployment**

**Trigger:** Conclusão bem-sucedida do CI.yml na branch `main`

**Propósito:** Deployment automático com Blue-Green deployment

### Jobs (sequência):

1. **pre-deployment-checks** - Validações iniciais
2. **database-backup** - Backup do PostgreSQL
3. **check-prerequisites** - Verifica requisitos no VPS
4. **update-repository** - Pull do código
5. **setup-environment** - Configura `.env`
6. **cleanup-containers** - Remove containers antigos
7. **build-and-deploy** - Docker compose up -d --build
8. **wait-services** - Aguarda serviços prontos
9. **migrations-and-health** - Prisma + health checks
10. **connectivity-test** - Testa aplicação
11. **deployment-complete** - Sucesso
12. **deployment-rollback** - Rollback automático se falhar

### Características:

- ✅ **Backup automático** antes do deploy
- ✅ **Blue-Green deployment** (dois ambientes)
- ✅ **Rollback automático** em caso de falha
- ✅ **Health checks** antes de considerar pronto
- ✅ **Smoke tests** pós-deployment

### Fluxo:

```
1. CI passa ✅
   ↓
2. Faz backup do banco 💾
   ↓
3. Verifica pré-requisitos ✅
   ↓
4. Atualiza código 🔄
   ↓
5. Limpa containers antigos 🧹
   ↓
6. Build nova versão 🔨
   ↓
7. Aguarda serviços prontos ⏳
   ↓
8. Executa migrations 🗄️
   ↓
9. Valida aplicação 🌐
   ↓
10. Deploy concluído ✅
```

---

## 📦 **4. RELEASE.yml - Release Management**

**Trigger:** Manual com `workflow_dispatch`

**Propósito:** Gerenciar versões e deployments controlados

### Opções de dispatch:

```
Release Type: patch | minor | major | hotfix
Target Env:   staging | production
```

### Jobs:

1. **validate-release** - Calcula nova versão
2. **build-release** - Build + tar.gz
3. **update-version** - Atualiza package.json + CHANGELOG
4. **deploy-staging** - Deploy para staging (automático)
5. **staging-tests** - Testes em staging
6. **approval-production** - Aguarda aprovação manual
7. **deploy-production** - Deploy para prod
8. **create-release** - Cria tag no GitHub

### Como usar:

```bash
1. Vá para: GitHub > Actions > Release and Deployment
2. Clique "Run workflow"
3. Selecione:
   - Release Type: minor
   - Environment: production
4. Clique "Run workflow"
5. Aprove quando solicitado
```

### Exemplo de versão gerada:

```
v1.0.0 → patch → v1.0.1
v1.0.1 → minor → v1.1.0
v1.1.0 → major → v2.0.0
v2.0.0 → hotfix → v2.0.0-hotfix
```

---

## 🏥 **5. HEALTH-CHECK.yml - Monitoring Contínuo**

**Trigger:** A cada 30 minutos (cron) + manual

**Propósito:** Monitorar saúde da aplicação em production

### Jobs (rodas periodicamente):

1. **health-check** - HTTP response + tempo de resposta
2. **database-health** - PostgreSQL + Redis status
3. **containers-health** - Docker containers status + CPU
4. **disk-health** - Espaço em disco
5. **logs-analysis** - Analisa erros dos logs
6. **api-health** - Testa endpoints principais
7. **health-report** - Relatório final

### O que monitora:

- ✅ Aplicação respondendo
- ✅ Tempo de resposta
- ✅ PostgreSQL e Redis
- ✅ Espaço em disco
- ✅ Uso de CPU/Memory
- ✅ Logs de erro
- ✅ API endpoints

### Se falhar:

- Cria issue automaticamente no GitHub
- Label: `health-check`, `urgent`

---

## 🔐 Secrets Necessários

Configure os seguintes secrets no GitHub:

### VPS Production:

```
VPS_HOST              - Host do VPS (ex: 192.168.1.100)
VPS_USER              - Username SSH
VPS_SSH_KEY           - Private SSH Key
```

### VPS Staging (opcional):

```
STAGING_VPS_HOST
STAGING_VPS_USER
STAGING_VPS_SSH_KEY
```

### Database:

```
DATABASE_URL          - postgresql://user:pass@host/db
POSTGRES_USER         - terral
POSTGRES_PASSWORD     - senha_segura
POSTGRES_DB           - terralsocial
```

### Redis:

```
REDIS_URL             - redis://localhost:6379
```

### Aplicação:

```
NEXT_PUBLIC_APP_URL   - http://seu-dominio.com
```

### MercadoPago:

```
MERCADOPAGO_ACCESS_TOKEN
MERCADOPAGO_PUBLIC_KEY
```

### Docker Hub:

```
DOCKER_USERNAME       - seu_username
DOCKER_PASSWORD       - seu_token
```

### GitHub:

```
GITHUB_TOKEN          - Automático pelo Actions
```

---

## 📊 Diagrama de Status

### ✅ Sucesso (Green)

```
CI ✅ → Tests ✅ → CD ✅ → Production ✅
```

### ⚠️ Com Testes Falhando

```
CI ✅ → Tests ⚠️ → CD não executa (pipeline aguarda manual)
```

### ❌ Falha no CD (Rollback)

```
CI ✅ → Health Check ❌ → Rollback automático
Previous version restaurada ✅
```

---

## 🎯 Melhores Práticas

### 1. **Commits bem formatados**

```bash
git commit -m "feat: nova funcionalidade"
git commit -m "fix: corrigido bug X"
git commit -m "docs: atualizada documentação"
```

### 2. **Antes de fazer push**

```bash
npm run lint        # Verificar linting
npm run build       # Garantir build
npm run test        # Rodar testes
```

### 3. **Releases sempre com tag**

```bash
git tag v1.2.3
git push origin v1.2.3
```

### 4. **Monitorar workflows**

- Sempre verificar status no GitHub Actions
- Ler logs em caso de falha
- Não ignorar avisos de segurança

---

## 🔧 Troubleshooting

### O CI está falhando?

1. Verifique os logs no GitHub Actions
2. Rode localmente: `npm run lint && npm run build && npm run test`
3. Corrija os erros e faça novo push

### O deploy falhou?

1. Verifique a conectividade SSH com o VPS
2. Confirme que os secrets estão configurados
3. Valide `.env` no VPS
4. Rolllback automático executará

### Health check criou issue?

1. SSH no VPS
2. Execute: `docker compose logs -f`
3. Identifique o problema
4. Corrija e monitore novamente

### Docker build está lento?

1. Adicione cache: `docker build --cache-from`
2. Otimize Dockerfile (multi-stage)
3. Comprima imagens

---

## 📈 Performance Tips

1. **Paralelização**: Jobs independentes executam em paralelo
2. **Caching**: npm dependencies são cacheadas
3. **Timeouts**: Configure tempos realistas
4. **Cleanup**: Remova artifacts antigos automaticamente
5. **Concurrency**: Cancele workflows antigos se novo push chegar

---

## 📞 Suporte

Em caso de problemas:

1. Verifique GitHub Actions logs
2. Consulte TROUBLESHOOTING.md
3. Crie issue com debug logs
4. Procure @efpatti

---

**Última atualização:** Outubro 2025
**Versão:** 2.0.0
