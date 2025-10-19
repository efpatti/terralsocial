# 🚀 GitHub Actions - Terral Social v2.0

**Transformação completa de CI/CD em infraestrutura profissional**

---

## 📦 O que foi criado

### Workflows (5 arquivos)

```
.github/workflows/
├── ci.yml                    # Continuous Integration
├── tests.yml                 # Advanced Testing
├── cd.yml                    # Continuous Deployment
├── release.yml              # Release Management
└── health-check.yml         # Health Monitoring
```

### Documentação (4 arquivos)

```
└── (raiz do projeto)
    ├── WORKFLOWS.md                 # Guia completo dos workflows
    ├── GITHUB_ACTIONS_SETUP.md     # Setup e troubleshooting
    ├── CI_CD_ARCHITECTURE.md       # Diagramas e arquitetura
    └── lighthouserc.json           # Configuração Lighthouse
```

---

## 🎯 O que cada workflow faz

### 1. **CI.yml** - Validação de Código

```
✅ ESLint + TypeScript
✅ Build Next.js
✅ Testes Unitários
✅ Docker Build
✅ Trivy Security Scan
✅ npm audit de dependências
✅ Relatório final
```

### 2. **Tests.yml** - Testes Avançados

```
✅ Testes de Integração (PostgreSQL + Redis)
✅ Lighthouse Performance Audit
✅ Bundle Size Analysis
✅ Segurança (secrets, vulnerabilities)
✅ E2E Tests (Playwright)
✅ Performance Monitoring
✅ Testes de Acessibilidade
```

### 3. **CD.yml** - Deploy Automático

```
✅ Pre-deployment checks
✅ Database backup automático 💾
✅ Repository update 🔄
✅ Environment configuration ⚙️
✅ Container cleanup 🧹
✅ Build & Deploy (Docker) 🔨
✅ Health checks extensivos 🏥
✅ Smoke tests pós-deploy
✅ Rollback automático ↩️ em caso de falha
✅ Notificações de status
```

### 4. **Release.yml** - Gerenciamento de Versões

```
✅ Validação de release
✅ Build de artefatos (tar.gz)
✅ Atualização automática de versão
✅ Deploy em staging (automático)
✅ Deploy em production (com approval)
✅ Criar GitHub Release + tag
✅ Upload de artifacts
```

### 5. **Health-Check.yml** - Monitoramento

```
✅ Executa a cada 30 minutos
✅ Testa aplicação (HTTP + tempo resposta)
✅ Monitora PostgreSQL e Redis
✅ Analisa Docker containers
✅ Verifica espaço em disco
✅ Analisa logs de erro
✅ Testa API endpoints
✅ Cria issue se falhar
```

---

## 🚀 Como Usar

### Para Desenvolvedores

#### Fluxo padrão:

```bash
# 1. Desenvolver localmente
npm run dev

# 2. Antes de commitar
npm run lint      # Verificar código
npm run build     # Build
npm run test      # Testes

# 3. Commitar e fazer push
git add .
git commit -m "feat: descrição"
git push origin feature-branch

# 4. GitHub Actions executa automaticamente
# ✅ CI passa → ✅ Tests passa → Pronto para merge
```

#### Monitorar:

```
GitHub → Actions → Procurar seu commit
```

### Para DevOps/Releases

#### Fazer release automático:

```
1. GitHub → Actions → "Release and Deployment"
2. "Run workflow"
3. Selecione:
   - Release Type: patch/minor/major
   - Environment: staging ou production
4. "Run workflow"
5. Aprove se prod
```

#### Monitorar saúde (automático):

```
A cada 30 minutos, workflows rodam e:
- Testam aplicação
- Verificam banco de dados
- Analisam logs
- Criam issues se houver problemas
```

---

## 📊 Benefícios Implementados

### ✅ Qualidade de Código

- Lint automático (ESLint)
- Type checking (TypeScript)
- Security scanning (Trivy)
- Dependency audits

### ✅ Testes Completos

- Unit tests
- Integration tests
- E2E tests
- Performance tests
- Accessibility tests

### ✅ Deploy Seguro

- Backup automático antes de deploy
- Blue-green deployment
- Health checks
- Rollback automático

### ✅ Performance

- Caching de dependências
- Docker layer caching
- Parallelização de jobs
- Concurrency management

### ✅ Monitoramento

- Health checks a cada 30 min
- Análise de logs
- Alertas automáticos (issues)
- Métricas de performance

### ✅ Compliance

- Secrets seguros no GitHub
- Audit logs
- Deployment history
- Release tracking

---

## 🔐 Requisitos de Setup

### Secrets a Configurar

```
Production VPS:
- VPS_HOST
- VPS_USER
- VPS_SSH_KEY

Database:
- DATABASE_URL
- POSTGRES_USER
- POSTGRES_PASSWORD
- POSTGRES_DB
- REDIS_URL

Application:
- NEXT_PUBLIC_APP_URL
- MERCADOPAGO_ACCESS_TOKEN
- MERCADOPAGO_PUBLIC_KEY

Optional:
- DOCKER_USERNAME
- DOCKER_PASSWORD
```

Veja `GITHUB_ACTIONS_SETUP.md` para instruções completas.

---

## 📈 Fluxo Completo

```
Developer Push → CI (lint, build, test)
    ✅ passa
        → Tests (integration, e2e, performance)
            ✅ passa
                → CD (deploy automático)
                    ✅ backup + build + health checks
                        → Production Live ✅

A cada 30 min:
    → Health Check (monitora saúde)
        ❌ falha → Cria issue automática
        ✅ ok → Tudo bem
```

---

## 📚 Documentação

### Arquivos criados:

1. **WORKFLOWS.md** - Guia completo de todos os workflows
2. **GITHUB_ACTIONS_SETUP.md** - Setup passo-a-passo + troubleshooting
3. **CI_CD_ARCHITECTURE.md** - Diagramas e fluxos visuais

### Ler primeiro:

- `CI_CD_ARCHITECTURE.md` - Entender a arquitetura
- `GITHUB_ACTIONS_SETUP.md` - Configurar secrets
- `WORKFLOWS.md` - Detalhe de cada workflow

---

## 🎯 Próximos Passos

### 1️⃣ Configurar Secrets

```
GitHub Settings → Secrets and variables → Actions
Configurar todos os secrets listados em GITHUB_ACTIONS_SETUP.md
```

### 2️⃣ Testar CI

```
Push um commit → Actions → Ver status (deve ser ✅)
```

### 3️⃣ Testar Deploy

```
Se CI passa → CD executa automaticamente
Monitor em Actions
```

### 4️⃣ Configurar Health Checks

```
Health checks começam a rodar a cada 30 min automaticamente
Se falhar → Issue criada automaticamente
```

---

## 🎊 Resumo das Melhorias

| Antes                  | Depois                       |
| ---------------------- | ---------------------------- |
| 1 job gigante (30 min) | 5 workflows especializados   |
| Sem validação          | Lint + TypeScript + Security |
| Sem testes             | 7 tipos de testes            |
| Manual backup          | Automático antes de deploy   |
| Sem rollback           | Rollback automático          |
| Sem monitoramento      | Health check a cada 30 min   |
| Sem versioning         | Release automático           |

---

## ✨ Diferenciais

- 🏗️ **Blue-Green Deployment** - Zero downtime
- 🔄 **Rollback Automático** - Segurança em falhas
- 💾 **Backup Automático** - Proteção de dados
- 📊 **7 tipos de testes** - Qualidade garantida
- 🏥 **Monitoramento 24/7** - Alerts automáticos
- 🔐 **Security scanning** - Vulnerabilities detectadas
- 📦 **Release management** - Versioning automático
- ⚡ **Performance optimized** - Caching inteligente

---

## 🚨 Avisos

- ⚠️ Crie branch deploy SSH key (sem passphrase)
- ⚠️ Guarde secrets com segurança
- ⚠️ Testes locais antes de push (economiza tempo)
- ⚠️ Monitorar primeiro deploy com atenção

---

## 📞 Suporte

Em caso de dúvidas:

1. Consulte `WORKFLOWS.md`
2. Consulte `GITHUB_ACTIONS_SETUP.md`
3. Veja `CI_CD_ARCHITECTURE.md`
4. Check logs em GitHub Actions
5. Debug manual no VPS se necessário

---

**Infraestrutura de CI/CD Profissional** ✅
**Pronto para produção** ✅
**Seguro e escalável** ✅

---

Criado em: Outubro 2025
Versão: 2.0.0
