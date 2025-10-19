# 🚀 Guia de Instalação Rápida - Sistema de Voluntários

## ✅ Checklist de Implementação

### 1. Instalar Dependências

```bash
npm install
```

### 2. Iniciar Banco de Dados (Docker)

```bash
# Iniciar PostgreSQL e Redis locais
docker-compose -f docker-compose.dev.yml up -d

# Verificar se estão rodando
docker ps
```

### 3. Configurar Ambiente

```bash
# Criar arquivo .env.local
cat > .env.local << 'EOF'
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=postgresql://postgres:password@localhost:5432/terralsocial
REDIS_URL=redis://localhost:6379
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=terralsocial
EOF
```

### 4. Setup do Banco de Dados

```bash
# Gerar Prisma Client e criar tabelas
npx prisma generate
npx prisma db push

# OU usar script npm
npm run db:setup
```

### 5. Rodar Aplicação

```bash
npm run dev
```

Acesse: http://localhost:3000/como-ajudar/seja-voluntario

## 🧪 Testar Funcionalidade

1. Abra http://localhost:3000/como-ajudar/seja-voluntario
2. Preencha o formulário de voluntário
3. Clique em "Enviar Inscrição"
4. Deve aparecer mensagem de sucesso

### Verificar Dados no Banco

```bash
# Opção 1: Prisma Studio (Interface Visual)
npx prisma studio
# Abre em http://localhost:5555

# Opção 2: CLI do PostgreSQL
docker exec -it terralsocial-dev-postgres psql -U postgres -d terralsocial -c "SELECT * FROM volunteers;"
```

## 📦 O que Foi Implementado

### ✅ Backend

- [x] Prisma ORM configurado
- [x] Schema do banco (model Volunteer)
- [x] API endpoint POST /api/volunteers
- [x] API endpoint GET /api/volunteers (lista com paginação)
- [x] Validação com Zod
- [x] Tratamento de erros robusto
- [x] Prevenção de duplicatas (email único)

### ✅ Frontend

- [x] Formulário atualizado com POST real
- [x] Estados de loading/error/success
- [x] Tratamento de erros específicos
- [x] UX melhorada

### ✅ Infraestrutura

- [x] Docker Compose para desenvolvimento
- [x] Docker Compose para produção
- [x] Dockerfile atualizado com Prisma
- [x] GitHub Actions com migrations automáticas
- [x] Scripts npm para Prisma
- [x] Variáveis de ambiente separadas por ambiente

### ✅ Documentação

- [x] DATABASE_SETUP.md - Guia completo
- [x] QUICK_START.md - Instalação rápida
- [x] README.md atualizado
- [x] Comentários no código

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev                    # Servidor dev
npm run build                  # Build produção
npm run start                  # Serve build

# Prisma
npm run prisma:generate        # Gerar client
npm run prisma:push            # Push schema
npm run prisma:studio          # Interface visual
npm run db:setup               # Setup completo

# Docker
docker-compose -f docker-compose.dev.yml up -d      # Subir
docker-compose -f docker-compose.dev.yml down       # Derrubar
docker-compose -f docker-compose.dev.yml logs -f    # Logs
```

## 🐛 Troubleshooting

### Erro: Cannot find module '@prisma/client'

```bash
npx prisma generate
```

### Erro: Error connecting to database

```bash
docker-compose -f docker-compose.dev.yml restart postgres
```

### Erro: Table does not exist

```bash
npx prisma db push
```

### Limpar tudo e recomeçar

```bash
docker-compose -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.dev.yml up -d
npx prisma db push
```

## 🌐 Deploy em Produção

O deploy é **100% automático** via GitHub Actions:

1. Faça push para `main`
2. GitHub Actions executa automaticamente
3. Deploy no VPS com Docker
4. Migrations aplicadas automaticamente

### Secrets GitHub (já configuradas)

- ✅ DATABASE_URL
- ✅ REDIS_URL
- ✅ SSH_HOST (VPS_HOST)
- ✅ SSH_USER (VPS_USER)
- ✅ SSH_KEY (VPS_SSH_KEY)

## 📊 Estrutura de Arquivos Criados

```
terralsocial/
├── prisma/
│   └── schema.prisma                    # ✅ Schema do banco
├── src/
│   ├── app/
│   │   └── api/
│   │       └── volunteers/
│   │           └── route.ts             # ✅ API endpoint
│   │   └── como-ajudar/
│   │       └── seja-voluntario/
│   │           └── page.tsx             # ✅ Formulário atualizado
│   └── lib/
│       ├── prisma.ts                    # ✅ Cliente Prisma
│       └── env.ts                       # ✅ Validação env
├── scripts/
│   └── deploy-vps.sh                    # ✅ Script de deploy
├── docker-compose.dev.yml               # ✅ Docker dev
├── docker-compose.yml                   # ✅ Docker prod
├── Dockerfile                           # ✅ Atualizado com Prisma
├── .github/workflows/deploy.yml         # ✅ CI/CD atualizado
├── DATABASE_SETUP.md                    # ✅ Guia detalhado
├── QUICK_START.md                       # ✅ Este arquivo
└── package.json                         # ✅ Scripts adicionados
```

## ✨ Próximos Passos

Após confirmar que está funcionando localmente:

1. ✅ Commit e push para GitHub
2. ✅ GitHub Actions fará deploy automático
3. ✅ Testar em produção: http://<VPS_IP>:3000/como-ajudar/seja-voluntario

## 📞 Suporte

Dúvidas? Confira:

- DATABASE_SETUP.md - Guia completo
- DEPLOY.md - Documentação de deploy
- README.md - Visão geral do projeto

---

**🎉 Tudo pronto! Comece com `npm install` e depois `npm run dev`**
