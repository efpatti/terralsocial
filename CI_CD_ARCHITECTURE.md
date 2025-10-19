# Arquitetura de CI/CD - Terral Social

## 🏗️ Arquitetura Geral

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                            GitHub Workflows Architecture                      │
└──────────────────────────────────────────────────────────────────────────────┘

                              ┌─────────────┐
                              │  Developer  │
                              │  Push Code  │
                              └──────┬──────┘
                                     │
                        ┌────────────▼────────────┐
                        │   GitHub Repository    │
                        │   (main/develop)       │
                        └────────────┬────────────┘
                                     │
                ┌────────────────────┼────────────────────┐
                │                    │                    │
        ┌───────▼────────┐  ┌────────▼──────────┐  ┌─────▼──────────┐
        │   CI.yml       │  │   TESTS.yml       │  │  RELEASE.yml   │
        │ ────────────   │  │ ──────────────    │  │ ────────────   │
        │ • Lint         │  │ • Integration     │  │ • Validate     │
        │ • Build        │  │ • E2E             │  │ • Build        │
        │ • Unit Tests   │  │ • Performance     │  │ • Version      │
        │ • Docker Build │  │ • Security        │  │ • Stage Env    │
        │ • Security     │  │ • Accessibility   │  │ • Production   │
        │ • Dependencies │  │ • Bundle Analysis │  │ • Release Tag  │
        └───────┬────────┘  └────────┬──────────┘  └─────┬──────────┘
                │                    │                    │
                └────────────────────┼────────────────────┘
                                     │
                              ✅ Todas as checks passaram
                                     │
                        ┌────────────▼────────────┐
                        │   CD.yml               │
                        │ ───────────────────    │
                        │ • Pre-deployment       │
                        │ • Database Backup      │
                        │ • Repository Update    │
                        │ • Environment Setup    │
                        │ • Container Cleanup    │
                        │ • Build & Deploy       │
                        │ • Wait Services        │
                        │ • Migrations           │
                        │ • Health Checks        │
                        │ • Connectivity Tests   │
                        └────────────┬───────────┘
                                     │
                ┌────────────────────┼────────────────────┐
                │                    │                    │
         ✅ Success           ⚠️ Warning           ❌ Failure
                │                    │                    │
        ┌───────▼────────┐  ┌────────▼──────────┐  ┌─────▼──────────┐
        │   Production   │  │   Alert Issue     │  │   Rollback     │
        │   Live ✅      │  │   (auto created)  │  │   Auto Restore │
        │                │  │                    │  │   Previous Ver │
        │   🌐 Ready     │  │   📧 Notify Team  │  │   ✅ Running   │
        └────────────────┘  └────────────────────┘  └─────────────────┘

                                     │
                        ┌────────────▼────────────┐
                        │ HEALTH-CHECK.yml       │
                        │ ────────────────────   │
                        │ (A cada 30 minutos)    │
                        │ • App Response         │
                        │ • Database Status      │
                        │ • Container Health     │
                        │ • Disk Space           │
                        │ • Logs Analysis        │
                        │ • API Endpoints        │
                        │ • Performance          │
                        └────────────────────────┘
```

---

## 📊 Fluxo Completo de Desenvolvimento

### 1️⃣ Develop & Commit (Local)

```
Developer Machine
├── git clone
├── npm install
├── npm run dev
├── [faz alterações]
├── npm run lint ✅
├── npm run build ✅
├── npm run test ✅
├── git add .
├── git commit -m "feat: X"
└── git push origin feature-branch
```

### 2️⃣ Pull Request (GitHub)

```
GitHub PR
├── CI/CD Status Check ⏳
│   ├── Lint → ✅
│   ├── Build → ✅
│   ├── Tests → ✅
│   ├── Docker → ✅
│   ├── Security → ✅
│   └── Dependencies → ✅
├── Tests Workflow ⏳
│   ├── Integration → ✅
│   ├── E2E → ✅
│   ├── Performance → ⚠️
│   ├── Security → ✅
│   └── Accessibility → ✅
├── ✅ Approved to Merge
└── Merge to main
```

### 3️⃣ Merge to Main (Automated Deploy)

```
Main Branch Push
├── CD Workflow starts ⏳
├── Pre-deployment checks ✅
├── Database backup 💾
├── Repository update 🔄
├── Environment setup ⚙️
├── Container cleanup 🧹
├── Build & Deploy 🔨
├── Wait for health ⏳
├── Run migrations 🗄️
├── Final validations ✅
└── 🌐 Production Live ✅

Timeline: ~20-30 mins
```

### 4️⃣ Continuous Monitoring

```
Every 30 minutes + Manual

Health Check Workflow
├── App Response Check ✅
├── Database Status ✅
├── Container Metrics ✅
├── Disk Space ✅
├── Log Analysis ✅
├── API Endpoints ✅
└── If fails → Create Issue 📧
```

### 5️⃣ Release Management (Manual)

```
Actions > Release and Deployment > Run

Select options:
├── Release Type: patch/minor/major
└── Environment: staging/production

Process:
├── Validate release
├── Build artifacts
├── Deploy to staging
├── Run tests
├── Request approval (if prod)
├── Deploy to production
└── Create GitHub Release
```

---

## 🔄 Decisão Tree - Qual Workflow Usar?

```
┌─ Atualizei código localmente
│
├─ Fazer commit?
│  ├─ SIM → git push
│  │        └─ CI.yml executa automaticamente
│  │
│  └─ NÃO → npm run lint && npm run build && npm run test
│           └─ Verificar erros localmente
│
├─ Preciso fazer merge?
│  ├─ NÃO (ainda desenvolvendo)
│  │  └─ Continue commitando, CI dirá se algo quebrou
│  │
│  └─ SIM → Criar/Abrir PR
│           ├─ Esperar CI passar
│           ├─ Revisar código
│           ├─ Aprovação
│           └─ Merge → CD.yml executa automaticamente
│
├─ Preciso fazer release?
│  ├─ SIM → Actions > Release and Deployment
│  │        ├─ Escolher versão (patch/minor/major)
│  │        ├─ Escolher ambiente (staging/prod)
│  │        └─ Release.yml executa
│  │
│  └─ NÃO → CD.yml ainda em andamento
│
└─ Problemas em produção?
   ├─ SIM → Check health-check.yml
   │        ├─ Ver logs
   │        ├─ SSH no VPS se necessário
   │        └─ Rollback manual se precisar
   │
   └─ NÃO → Tudo OK! ✅
```

---

## ⏱️ Tempos de Execução

```
┌─────────────────────────────────────────────────────────────────┐
│ Workflow Performance                                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│ CI.yml (Lint, Build, Test)                    ~10 minutes       │
│ ├─ Lint ────────────────── 2 min              ▓▓░░░░░░░░░      │
│ ├─ Build ───────────────── 3 min              ▓▓▓░░░░░░░░      │
│ ├─ Unit Tests ──────────── 2 min              ▓▓░░░░░░░░░      │
│ ├─ Docker ──────────────── 2 min              ▓▓░░░░░░░░░      │
│ ├─ Security ─────────────── 1 min             ▓░░░░░░░░░░      │
│ └─ Dependencies ──────────── 1 min            ▓░░░░░░░░░░      │
│                                                                   │
│ TESTS.yml (Advanced Tests)                    ~20 minutes       │
│ ├─ Integration ─────────── 5 min              ▓▓▓▓▓░░░░░░      │
│ ├─ E2E ─────────────────── 8 min              ▓▓▓▓▓▓▓▓░░░      │
│ ├─ Performance ─────────── 4 min              ▓▓▓▓░░░░░░░      │
│ └─ Accessibility ────────── 3 min             ▓▓▓░░░░░░░░      │
│                                                                   │
│ CD.yml (Deploy)                               ~25 minutes       │
│ ├─ Pre-checks ──────────── 2 min              ▓▓░░░░░░░░░      │
│ ├─ Backup ──────────────── 5 min              ▓▓▓▓▓░░░░░░      │
│ ├─ Repository ──────────── 2 min              ▓▓░░░░░░░░░      │
│ ├─ Build ───────────────── 8 min              ▓▓▓▓▓▓▓▓░░░      │
│ ├─ Wait Services ────────── 3 min             ▓▓▓░░░░░░░░      │
│ ├─ Migrations ──────────── 2 min              ▓▓░░░░░░░░░      │
│ ├─ Health Checks ────────── 1 min             ▓░░░░░░░░░░      │
│ └─ Tests ───────────────── 2 min              ▓▓░░░░░░░░░      │
│                                                                   │
│ HEALTH-CHECK.yml (Monitoring)                 ~5 minutes        │
│ ├─ App Response ────────── 1 min              ▓░░░░░░░░░░      │
│ ├─ Database ────────────── 1 min              ▓░░░░░░░░░░      │
│ ├─ Containers ──────────── 1 min              ▓░░░░░░░░░░      │
│ ├─ Disk ────────────────── 1 min              ▓░░░░░░░░░░      │
│ └─ API ─────────────────── 1 min              ▓░░░░░░░░░░      │
│                                                                   │
│ RELEASE.yml (Full Release)                    ~45 minutes       │
│ ├─ Validate ────────────── 2 min              ▓▓░░░░░░░░░      │
│ ├─ Build ───────────────── 8 min              ▓▓▓▓▓▓▓▓░░░      │
│ ├─ Deploy Staging ──────── 10 min             ▓▓▓▓▓▓▓▓▓▓░      │
│ ├─ Stage Tests ─────────── 5 min              ▓▓▓▓▓░░░░░░      │
│ ├─ Manual Approval ─────── 15 min             [espera manual]  │
│ ├─ Deploy Prod ─────────── 10 min             ▓▓▓▓▓▓▓▓▓▓░      │
│ └─ Release Tag ─────────── 2 min              ▓▓░░░░░░░░░      │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Resumo dos Workflows

| Workflow    | Trigger         | Duração | Automático | Crítico  |
| ----------- | --------------- | ------- | ---------- | -------- |
| **CI**      | Push/PR         | 10 min  | ✅ Sim     | 🔴 Alto  |
| **Tests**   | Push/PR         | 20 min  | ✅ Sim     | 🟡 Médio |
| **CD**      | CI ok + main    | 25 min  | ✅ Sim     | 🔴 Alto  |
| **Release** | Manual dispatch | 45 min  | ❌ Não     | 🟡 Médio |
| **Health**  | A cada 30 min   | 5 min   | ✅ Sim     | 🟡 Médio |

---

**Diagrama atualizado:** Outubro 2025
**Versão:** 2.0.0
