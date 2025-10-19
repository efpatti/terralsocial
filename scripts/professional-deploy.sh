#!/bin/bash

################################################################################
# Terral Social - Professional Deployment Script
# 
# Este script implementa um processo de deploy robusto e completo seguindo
# princípios de Clean Code e boas práticas de DevOps.
#
# Autor: Equipe Terral Social
# Última atualização: 2025-10-19
################################################################################

set -e  # Falha imediatamente se qualquer comando retornar erro
set -u  # Falha se usar variável não definida
set -o pipefail  # Falha se qualquer comando em pipe falhar

# ==========================================
# CONFIGURAÇÕES
# ==========================================
readonly DEPLOY_DIR="/opt/terralsocial"
readonly REPO_URL="https://github.com/efpatti/terralsocial.git"
readonly BRANCH="main"
readonly APP_PORT=3000

# Cores para output
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly NC='\033[0m' # No Color

# ==========================================
# FUNÇÕES AUXILIARES
# ==========================================

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[✓]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo ""
    echo "========================================="
    echo "$1"
    echo "========================================="
}

check_command() {
    if command -v "$1" &> /dev/null; then
        log_success "$1 está instalado ($(command -v $1))"
        return 0
    else
        log_error "$1 não está instalado"
        return 1
    fi
}

# ==========================================
# 1. VERIFICAÇÃO DE PRÉ-REQUISITOS
# ==========================================
check_prerequisites() {
    print_header "VERIFICANDO PRÉ-REQUISITOS DO SISTEMA"
    
    local all_ok=true
    
    # Verificar Git
    if ! check_command git; then
        log_info "Instalando Git..."
        sudo apt-get update && sudo apt-get install -y git
    fi
    
    # Verificar Docker
    if ! check_command docker; then
        log_error "Docker não está instalado!"
        log_error "Instale o Docker: https://docs.docker.com/engine/install/"
        all_ok=false
    fi
    
    # Verificar Docker Compose
    if ! docker compose version &> /dev/null; then
        log_error "Docker Compose V2 não está disponível!"
        all_ok=false
    else
        log_success "Docker Compose V2 está disponível"
    fi
    
    # Verificar permissões Docker
    if ! docker ps &> /dev/null; then
        log_error "Usuário atual não tem permissão para usar Docker!"
        log_error "Execute: sudo usermod -aG docker \$USER && newgrp docker"
        all_ok=false
    fi
    
    if [ "$all_ok" = false ]; then
        exit 1
    fi
    
    log_success "Todos os pré-requisitos estão satisfeitos"
}

# ==========================================
# 2. GERENCIAMENTO DO REPOSITÓRIO
# ==========================================
setup_repository() {
    print_header "GERENCIANDO REPOSITÓRIO"
    
    if [ ! -d "$DEPLOY_DIR" ]; then
        log_warn "Diretório $DEPLOY_DIR não existe"
        log_info "Criando diretório e clonando repositório..."
        
        sudo mkdir -p "$DEPLOY_DIR"
        sudo chown -R "$USER:$USER" "$DEPLOY_DIR"
        
        git clone "$REPO_URL" "$DEPLOY_DIR"
        log_success "Repositório clonado com sucesso"
    else
        log_info "Diretório existe. Verificando se é um repositório Git..."
        
        if [ ! -d "$DEPLOY_DIR/.git" ]; then
            log_error "$DEPLOY_DIR existe mas não é um repositório Git!"
            log_info "Removendo diretório e clonando repositório..."
            
            sudo rm -rf "$DEPLOY_DIR"
            sudo mkdir -p "$DEPLOY_DIR"
            sudo chown -R "$USER:$USER" "$DEPLOY_DIR"
            
            git clone "$REPO_URL" "$DEPLOY_DIR"
            log_success "Repositório clonado com sucesso"
        else
            log_success "Repositório Git válido encontrado"
        fi
    fi
    
    cd "$DEPLOY_DIR" || {
        log_error "Falha ao acessar $DEPLOY_DIR"
        exit 1
    }
}

# ==========================================
# 3. ATUALIZAÇÃO DO CÓDIGO
# ==========================================
update_code() {
    print_header "ATUALIZANDO CÓDIGO DO REPOSITÓRIO"
    
    # Verificar se há mudanças locais
    if ! git diff-index --quiet HEAD --; then
        log_warn "Existem mudanças locais não commitadas"
        log_info "Salvando mudanças locais em stash..."
        git stash save "Auto-stash antes do deploy $(date +%Y%m%d_%H%M%S)"
    fi
    
    # Fetch e reset
    log_info "Baixando últimas mudanças da branch $BRANCH..."
    git fetch origin "$BRANCH"
    
    BEFORE_COMMIT=$(git rev-parse HEAD)
    git reset --hard "origin/$BRANCH"
    AFTER_COMMIT=$(git rev-parse HEAD)
    
    if [ "$BEFORE_COMMIT" = "$AFTER_COMMIT" ]; then
        log_info "Repositório já estava atualizado (commit: ${AFTER_COMMIT:0:7})"
    else
        log_success "Código atualizado de ${BEFORE_COMMIT:0:7} para ${AFTER_COMMIT:0:7}"
    fi
    
    export CURRENT_COMMIT="$AFTER_COMMIT"
}

# ==========================================
# 4. CONFIGURAÇÃO DE VARIÁVEIS DE AMBIENTE
# ==========================================
setup_environment() {
    print_header "CONFIGURANDO VARIÁVEIS DE AMBIENTE"
    
    # As variáveis são passadas como argumentos do script
    cat > .env << ENV_EOF
# Database
DATABASE_URL=${DATABASE_URL}

# Redis
REDIS_URL=${REDIS_URL}

# Application
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}

# PostgreSQL (para container)
POSTGRES_USER=${POSTGRES_USER}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
POSTGRES_DB=${POSTGRES_DB}

# MercadoPago (opcional)
MERCADOPAGO_ACCESS_TOKEN=${MERCADOPAGO_ACCESS_TOKEN:-}
MERCADOPAGO_PUBLIC_KEY=${MERCADOPAGO_PUBLIC_KEY:-}
ENV_EOF
    
    log_success "Arquivo .env criado"
}

# ==========================================
# 5. PARAR CONTAINERS ANTIGOS
# ==========================================
stop_containers() {
    print_header "PARANDO CONTAINERS EXISTENTES"
    
    if docker compose ps -q 2>/dev/null | grep -q .; then
        log_info "Parando containers..."
        docker compose down --remove-orphans
        log_success "Containers parados"
    else
        log_info "Nenhum container rodando"
    fi
}

# ==========================================
# 6. LIMPEZA DE RECURSOS
# ==========================================
cleanup_docker() {
    print_header "LIMPANDO RECURSOS DOCKER"
    
    log_info "Removendo recursos não utilizados..."
    docker system prune -f || true
    
    log_success "Limpeza concluída"
}

# ==========================================
# 7. BUILD E INICIALIZAÇÃO DOS CONTAINERS
# ==========================================
build_and_start() {
    print_header "BUILDANDO E INICIANDO CONTAINERS"
    
    log_info "Iniciando build (isso pode levar alguns minutos)..."
    
    if docker compose up -d --build 2>&1 | tee /tmp/docker-build.log; then
        log_success "Containers iniciados com sucesso"
    else
        log_error "Falha ao buildar/iniciar containers!"
        log_error "Logs do build:"
        cat /tmp/docker-build.log
        docker compose logs --tail=100
        exit 1
    fi
}

# ==========================================
# 8. AGUARDAR HEALTHCHECKS
# ==========================================
wait_for_health() {
    print_header "AGUARDANDO CONTAINERS FICAREM PRONTOS"
    
    local max_wait=90
    local elapsed=0
    local interval=5
    
    log_info "Aguardando healthchecks passarem (até ${max_wait} segundos)..."
    
    while [ $elapsed -lt $max_wait ]; do
        sleep $interval
        elapsed=$((elapsed + interval))
        
        # Verificar PostgreSQL
        if docker exec terralsocial-postgres pg_isready -U "${POSTGRES_USER:-terral}" &> /dev/null; then
            log_success "PostgreSQL está pronto após ${elapsed}s"
            break
        else
            log_info "Aguardando PostgreSQL... (${elapsed}s/${max_wait}s)"
        fi
    done
    
    if [ $elapsed -ge $max_wait ]; then
        log_warn "Timeout aguardando PostgreSQL"
    fi
    
    # Aguardar Next.js
    log_info "Aguardando Next.js iniciar..."
    sleep 20
}

# ==========================================
# 9. EXECUTAR MIGRATIONS
# ==========================================
run_migrations() {
    print_header "EXECUTANDO MIGRATIONS DO BANCO"
    
    if docker exec terralsocial-nextjs npx prisma db push --skip-generate 2>&1; then
        log_success "Migrations aplicadas com sucesso"
    else
        log_warn "Falha ao executar migrations (pode já estar atualizado)"
    fi
}

# ==========================================
# 10. VERIFICAÇÃO DE SAÚDE DOS CONTAINERS
# ==========================================
verify_health() {
    print_header "VERIFICANDO SAÚDE DOS CONTAINERS"
    
    echo ""
    log_info "Status dos containers:"
    docker compose ps
    
    echo ""
    log_info "Containers rodando:"
    docker ps --filter "name=terralsocial" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    
    echo ""
    
    # Verificar Next.js
    if docker ps -q -f name=terralsocial-nextjs -f status=running | grep -q .; then
        log_success "Container Next.js está rodando"
        echo ""
        log_info "Últimas 30 linhas de log do Next.js:"
        docker logs terralsocial-nextjs --tail 30
    else
        log_error "Container Next.js NÃO está rodando!"
        echo ""
        log_error "Logs completos do Next.js:"
        docker logs terralsocial-nextjs --tail 100 2>&1 || echo "Container não encontrado"
        exit 1
    fi
    
    echo ""
    
    # Verificar PostgreSQL
    if docker ps -q -f name=terralsocial-postgres -f status=running | grep -q .; then
        log_success "Container PostgreSQL está rodando"
    else
        log_error "Container PostgreSQL NÃO está rodando!"
        docker logs terralsocial-postgres --tail 50 2>&1
    fi
    
    echo ""
    
    # Verificar Redis
    if docker ps -q -f name=terralsocial-redis -f status=running | grep -q .; then
        log_success "Container Redis está rodando"
    else
        log_warn "Container Redis NÃO está rodando!"
        docker logs terralsocial-redis --tail 50 2>&1
    fi
}

# ==========================================
# 11. TESTE DE CONECTIVIDADE
# ==========================================
test_connectivity() {
    print_header "TESTANDO CONECTIVIDADE DA APLICAÇÃO"
    
    sleep 5
    
    if curl -f -s "http://localhost:${APP_PORT}" > /dev/null; then
        log_success "Aplicação está respondendo em http://localhost:${APP_PORT}"
    else
        log_warn "Aplicação pode não estar respondendo ainda (normal em primeira execução)"
    fi
}

# ==========================================
# 12. RESUMO FINAL
# ==========================================
print_summary() {
    echo ""
    print_header "DEPLOY CONCLUÍDO COM SUCESSO!"
    echo ""
    log_info "Informações do deploy:"
    log_info "  • Commit: ${CURRENT_COMMIT:0:7}"
    log_info "  • Data: $(date '+%Y-%m-%d %H:%M:%S')"
    log_info "  • Diretório: $DEPLOY_DIR"
    echo ""
    log_info "Aplicação disponível em:"
    log_info "  • Local: http://localhost:${APP_PORT}"
    echo ""
    log_info "Comandos úteis:"
    log_info "  • Ver logs: docker compose logs -f"
    log_info "  • Reiniciar: docker compose restart"
    log_info "  • Parar: docker compose down"
    echo ""
}

# ==========================================
# MAIN - Execução Principal
# ==========================================
main() {
    local start_time=$(date +%s)
    
    log_info "Iniciando deploy do Terral Social..."
    log_info "Data: $(date '+%Y-%m-%d %H:%M:%S')"
    
    # Executar cada etapa
    check_prerequisites
    setup_repository
    update_code
    setup_environment
    stop_containers
    cleanup_docker
    build_and_start
    wait_for_health
    run_migrations
    verify_health
    test_connectivity
    print_summary
    
    local end_time=$(date +%s)
    local duration=$((end_time - start_time))
    
    log_success "Deploy concluído em ${duration} segundos"
}

# Executar script
main "$@"
