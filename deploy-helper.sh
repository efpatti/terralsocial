#!/bin/bash

# Script de gerenciamento do Terral Social no VPS
# Use: ./deploy-helper.sh [comando]

set -e

PROJECT_DIR="/opt/terralsocial"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para imprimir mensagens coloridas
print_info() {
    echo -e "${GREEN}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Função para verificar se está no diretório correto
check_directory() {
    if [ ! -d "$PROJECT_DIR" ]; then
        print_error "Diretório $PROJECT_DIR não encontrado!"
        exit 1
    fi
    cd "$PROJECT_DIR"
}

# Comandos disponíveis

status() {
    print_info "Status dos containers:"
    docker-compose ps
    echo ""
    print_info "Uso de recursos:"
    docker stats --no-stream
}

logs() {
    local service=${1:-nextjs}
    local lines=${2:-50}
    print_info "Exibindo últimas $lines linhas de log do $service:"
    docker logs "terralsocial-$service" --tail "$lines" -f
}

restart() {
    local service=${1:-all}
    if [ "$service" = "all" ]; then
        print_info "Reiniciando todos os containers..."
        docker-compose restart
    else
        print_info "Reiniciando container $service..."
        docker-compose restart "$service"
    fi
    print_info "Containers reiniciados com sucesso!"
}

stop() {
    print_warning "Parando todos os containers..."
    docker-compose down
    print_info "Containers parados!"
}

start() {
    print_info "Iniciando containers..."
    docker-compose up -d
    print_info "Containers iniciados!"
}

rebuild() {
    local service=${1:-nextjs}
    print_info "Reconstruindo container $service..."
    docker-compose up -d --build "$service"
    print_info "Container $service reconstruído!"
}

update() {
    print_info "Atualizando código do repositório..."
    git fetch origin main
    git reset --hard origin/main
    print_info "Código atualizado!"
    
    print_info "Reconstruindo e reiniciando containers..."
    docker-compose down
    docker-compose up -d --build
    print_info "Deploy concluído!"
}

clean() {
    print_warning "Limpando recursos Docker não utilizados..."
    docker system prune -f
    print_info "Limpeza concluída!"
}

backup() {
    local backup_dir="$PROJECT_DIR/backups"
    mkdir -p "$backup_dir"
    local timestamp=$(date +%Y%m%d_%H%M%S)
    
    print_info "Criando backup do banco de dados..."
    docker exec terralsocial-postgres pg_dump -U terral terralsocial > "$backup_dir/db_backup_$timestamp.sql"
    print_info "Backup criado: $backup_dir/db_backup_$timestamp.sql"
}

shell() {
    local service=${1:-nextjs}
    print_info "Abrindo shell no container $service..."
    docker exec -it "terralsocial-$service" sh
}

help() {
    echo "Uso: $0 [comando] [argumentos]"
    echo ""
    echo "Comandos disponíveis:"
    echo "  status              - Mostra status dos containers e uso de recursos"
    echo "  logs [service] [n]  - Exibe logs (default: nextjs, 50 linhas)"
    echo "  restart [service]   - Reinicia containers (default: all)"
    echo "  stop                - Para todos os containers"
    echo "  start               - Inicia containers"
    echo "  rebuild [service]   - Reconstrói container (default: nextjs)"
    echo "  update              - Atualiza código e reconstrói containers"
    echo "  clean               - Remove recursos Docker não utilizados"
    echo "  backup              - Cria backup do banco de dados PostgreSQL"
    echo "  shell [service]     - Abre shell no container (default: nextjs)"
    echo "  help                - Mostra esta mensagem"
    echo ""
    echo "Exemplos:"
    echo "  $0 status"
    echo "  $0 logs nextjs 100"
    echo "  $0 restart postgres"
    echo "  $0 rebuild nextjs"
}

# Main
check_directory

case "${1:-help}" in
    status)
        status
        ;;
    logs)
        logs "${2:-nextjs}" "${3:-50}"
        ;;
    restart)
        restart "${2:-all}"
        ;;
    stop)
        stop
        ;;
    start)
        start
        ;;
    rebuild)
        rebuild "${2:-nextjs}"
        ;;
    update)
        update
        ;;
    clean)
        clean
        ;;
    backup)
        backup
        ;;
    shell)
        shell "${2:-nextjs}"
        ;;
    help)
        help
        ;;
    *)
        print_error "Comando desconhecido: $1"
        echo ""
        help
        exit 1
        ;;
esac
