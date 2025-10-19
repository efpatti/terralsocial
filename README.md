# 🌱 Terral Social

Website institucional da Terral Social - Uma organização dedicada a transformar vidas através da educação e da arte.

![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED)
![License](https://img.shields.io/badge/license-MIT-green)

## 📋 Sobre o Projeto

Website desenvolvido com Next.js para apresentar as iniciativas, oficinas e formas de contribuição com a Terral Social.

### ✨ Funcionalidades

- 🏠 Página inicial com informações sobre a organização
- 👥 Seção "Quem Somos" com história, depoimentos e informações sobre a sede
- 🎨 Páginas de oficinas (Artes, Capoeira, Costura, Inglês, Reforço Escolar, Teatro)
- 🤝 Formas de ajudar (Doações, Voluntariado, Parcerias, Bazar)
- 💬 Formulário de contato
- 💳 Integração com Mercado Pago para doações

## 🚀 Deploy Automático

Este projeto está configurado com **deploy automático via GitHub Actions**. Ao fazer push na branch `main`, o código é automaticamente deployado no VPS usando Docker.

📖 **[Ver documentação completa de deploy](DEPLOY.md)**

### Comandos Rápidos no VPS

```bash
# Ver status dos containers
docker-compose ps

# Ver logs
docker logs terralsocial-nextjs -f

# Reiniciar aplicação
docker-compose restart nextjs

# Usar script auxiliar (mais opções)
./deploy-helper.sh help
```

## 🛠️ Tecnologias

- **Framework**: [Next.js 15.5.6](https://nextjs.org/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI**: [shadcn/ui](https://ui.shadcn.com/)
- **Containerização**: [Docker](https://www.docker.com/)
- **CI/CD**: [GitHub Actions](https://github.com/features/actions)
- **Banco de Dados**: PostgreSQL 16
- **Cache**: Redis 7

## 💻 Desenvolvimento Local

### Pré-requisitos

- Node.js 22+
- npm ou yarn
- Git

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/efpatti/terralsocial.git
cd terralsocial
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
# Edite .env com suas configurações
```

4. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

5. Abra [http://localhost:3000](http://localhost:3000) no navegador

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Cria build de produção (gera pasta 'out')

# Produção
npm start            # Serve arquivos estáticos da pasta 'out'

# Linting
npm run lint         # Executa ESLint
```

## 🐳 Docker

### Desenvolvimento com Docker

```bash
# Build da imagem
docker build -t terralsocial-nextjs .

# Executar container
docker run -p 3000:3000 terralsocial-nextjs
```

### Produção com Docker Compose

```bash
# Iniciar todos os serviços
docker-compose up -d

# Parar serviços
docker-compose down

# Ver logs
docker-compose logs -f

# Rebuildar
docker-compose up -d --build
```

## 📁 Estrutura do Projeto

```
terralsocial/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── public/                      # Arquivos estáticos
├── src/
│   ├── app/                     # Páginas e rotas (App Router)
│   │   ├── api/                # API routes
│   │   ├── como-ajudar/        # Páginas de contribuição
│   │   ├── oficinas/           # Páginas das oficinas
│   │   ├── quem-somos/         # Sobre a organização
│   │   └── page.tsx            # Página inicial
│   ├── components/             # Componentes React
│   │   └── ui/                 # Componentes shadcn/ui
│   ├── constants/              # Constantes e configurações
│   ├── data/                   # Dados estáticos
│   ├── lib/                    # Utilitários
│   └── types/                  # TypeScript types
├── docker-compose.yml          # Orquestração de containers
├── Dockerfile                  # Imagem Docker do Next.js
├── deploy-helper.sh            # Script auxiliar
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

**Desenvolvido com ❤️ por [efpatti](https://github.com/efpatti)**

---

## 📚 Documentação Adicional

- [Documentação de Deploy](DEPLOY.md) - Informações detalhadas sobre o processo de deploy
- [Next.js Documentation](https://nextjs.org/docs) - Framework utilizado
- [Tailwind CSS](https://tailwindcss.com/docs) - Estilização
- [shadcn/ui](https://ui.shadcn.com/) - Componentes UI
