# 🤝 Sistema de Engajamento - Terral Social

Este documento descreve as páginas criadas para engajar a comunidade com a Terral Social.

## 📄 Páginas Criadas

### 1. 🛍️ Seja Cliente do Bazar (`/como-ajudar/seja-cliente-do-bazar`)

Página dedicada a atrair clientes para o bazar da instituição.

#### Funcionalidades:

- ✅ **Como Funciona**: Explicação do processo em 3 passos
- ✅ **Produtos Disponíveis**: Categorias interativas (Roupas, Acessórios, Calçados, Artesanato)
- ✅ **Benefícios**: Por que comprar no bazar
- ✅ **Localização e Horários**: Informações completas de endereço e funcionamento
- ✅ **Depoimentos**: Avaliações de clientes reais
- ✅ **Call-to-Actions**: Botões para ver no mapa e ligar

#### Categorias de Produtos:

1. **Roupas** 👕

   - Camisetas, Calças, Vestidos, Blusas, Shorts

2. **Acessórios** ✨

   - Bolsas, Cintos, Chapéus, Bijuterias, Lenços

3. **Calçados** 👟

   - Tênis, Sandálias, Sapatos, Chinelos, Botas

4. **Artesanato** 🎨
   - Decoração, Quadros, Vasos, Peças únicas, Presentes

#### Benefícios Destacados:

- 💰 Preços acessíveis
- ❤️ Apoio social
- ♻️ Sustentabilidade
- 👥 Impacto comunitário

---

### 2. 🙋 Seja Voluntário (`/como-ajudar/seja-voluntario`)

Página para captação e inscrição de novos voluntários.

#### Funcionalidades:

- ✅ **Por que ser voluntário**: Benefícios do voluntariado
- ✅ **Áreas de Atuação**: 6 áreas diferentes com detalhes
- ✅ **Requisitos**: Lista clara de pré-requisitos
- ✅ **Formulário de Inscrição**: Completo e validado
- ✅ **Como Funciona**: Processo em 5 etapas
- ✅ **Depoimentos**: Histórias reais de voluntários
- ✅ **Call-to-Actions**: E-mail e telefone de contato

#### Áreas de Voluntariado:

1. **Educação** 🎓

   - Reforço escolar
   - Aulas de idiomas
   - Alfabetização

2. **Artes e Cultura** 🎨

   - Oficinas de arte
   - Teatro
   - Música
   - Dança

3. **Comunicação** 💬

   - Redes sociais
   - Design gráfico
   - Fotografia
   - Vídeo

4. **Tecnologia** 💻

   - Desenvolvimento web
   - TI
   - Manutenção de sistemas

5. **Administração** 💼

   - Gestão de projetos
   - Financeiro
   - RH
   - Jurídico

6. **Eventos** 📅
   - Festas comunitárias
   - Bazares
   - Campanhas

#### Requisitos para Voluntários:

- Ser maior de 16 anos
- Disponibilidade mínima de 4 horas semanais
- Comprometimento com os valores da instituição
- Pontualidade e responsabilidade
- Paixão por ajudar o próximo

#### Formulário de Inscrição:

- Nome completo
- E-mail
- Telefone
- Área de interesse (seleção)
- Disponibilidade (4-8h, 8-12h, 12-20h, 20+h por semana)
- Experiência prévia (opcional)
- Motivação (opcional)

---

## 🎨 Design e UX

### Paleta de Cores:

- **Bazar**: Azul (#3ca0e7) - Transmite confiança e acessibilidade
- **Voluntariado**: Verde (#499D4B) - Representa crescimento e esperança
- Cores secundárias para categorias: Vermelho, Roxo, Laranja, etc.

### Elementos Visuais:

- ✨ Animações suaves com Framer Motion
- 🎯 Ícones contextuais do Lucide React
- 📱 Design 100% responsivo
- 🎭 Hover states interativos
- 💫 Gradientes modernos

### Componentes Reutilizáveis:

- Cards de categorias/áreas
- Cards de benefícios
- Cards de depoimentos
- Formulários estilizados
- Botões CTAs

---

## 🔗 Integração com o Site

### Links Atualizados:

1. **Página Inicial** (`/`)

   - Botão "Doar Agora" → `/como-ajudar/doe-agora`
   - Botão "Seja Voluntário" → `/como-ajudar/seja-voluntario`

2. **Header/Menu** (recomendado adicionar):
   - Link "Como Ajudar" com submenu:
     - Doe Agora
     - Seja Voluntário
     - Seja Cliente do Bazar

---

## 📊 Próximas Melhorias

### Bazar:

1. **Galeria de Produtos**
   - Fotos reais dos produtos disponíveis
   - Sistema de categorias com filtros
2. **E-commerce (futuro)**
   - Venda online de artesanato
   - Reserva de produtos
3. **Estoque**
   - Indicador de produtos disponíveis
   - Alertas de novos produtos

### Voluntariado:

1. **API de Formulário**
   - Integração com banco de dados
   - Envio de e-mail automático
   - Painel administrativo
2. **Portal do Voluntário**
   - Login para voluntários ativos
   - Controle de horas
   - Certificados digitais
3. **Calendário**
   - Agendamento de atividades
   - Visualização de escalas
   - Eventos especiais

### Ambas:

1. **Analytics**
   - Tracking de conversões
   - Análise de comportamento
2. **SEO**

   - Meta tags otimizadas
   - Schema.org
   - Sitemap

3. **Acessibilidade**
   - ARIA labels
   - Contraste de cores
   - Navegação por teclado

---

## 🚀 Como Testar

### Desenvolvimento:

```bash
npm run dev
```

Acesse:

- http://localhost:3000/como-ajudar/seja-cliente-do-bazar
- http://localhost:3000/como-ajudar/seja-voluntario

### Checklist de Testes:

#### Bazar:

- [ ] Categorias são interativas ao hover
- [ ] Informações de contato estão corretas
- [ ] Mapa abre corretamente
- [ ] Design responsivo em mobile
- [ ] Todas as seções estão visíveis

#### Voluntariado:

- [ ] Formulário valida campos obrigatórios
- [ ] Seleção de área atualiza o formulário
- [ ] Mensagem de sucesso aparece após envio
- [ ] Áreas de atuação são clicáveis
- [ ] Design responsivo em mobile

---

## 📝 Personalização

### Atualizar Informações do Bazar:

Em `src/app/como-ajudar/seja-cliente-do-bazar/page.tsx`:

```typescript
// Endereço (linha ~290)
<p className="text-gray-600">
  Rua da Terral Social, 123<br />
  Terreirão - Cidade/Estado<br />
  CEP: 12345-678
</p>

// Horários (linha ~300)
<p>Segunda a Sexta: 9h às 17h</p>
<p>Sábado: 9h às 13h</p>

// Contatos (linha ~315)
href="tel:+5511999999999"  // Telefone
href="mailto:bazar@terralsocial.org.br"  // Email
```

### Atualizar Informações do Voluntariado:

Em `src/app/como-ajudar/seja-voluntario/page.tsx`:

```typescript
// Contatos (linha ~580)
href = "mailto:voluntarios@terralsocial.org.br";
href = "tel:+5511999999999";
```

### Adicionar Novas Áreas de Voluntariado:

```typescript
const volunteerAreas = [
 {
  title: "Nova Área",
  icon: IconName, // Escolha do Lucide React
  description: "Descrição da área",
  opportunities: ["Oportunidade 1", "Oportunidade 2"],
  color: "#HexColor",
 },
 // ...
];
```

---

## 🆘 Implementação do Formulário

### Backend Recomendado:

1. **Criar API Route** (`/api/volunteer-application/route.ts`):

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
 const data = await request.json();

 // Validar dados
 // Salvar no banco
 // Enviar email de confirmação
 // Notificar equipe

 return NextResponse.json({ success: true });
}
```

2. **Integrar com Email Service**:

   - SendGrid
   - Nodemailer
   - Resend

3. **Banco de Dados**:
   - Prisma + PostgreSQL
   - MongoDB
   - Firebase

---

## 📚 Dependências Utilizadas

- **Next.js 14+**: Framework React
- **Framer Motion**: Animações
- **Lucide React**: Ícones
- **Tailwind CSS**: Estilização

---

## ✅ Checklist de Deploy

- [ ] Atualizar informações de contato reais
- [ ] Adicionar endereço correto do bazar
- [ ] Configurar envio de formulário (API)
- [ ] Testar em diferentes dispositivos
- [ ] Validar acessibilidade
- [ ] Otimizar imagens (quando adicionadas)
- [ ] Configurar analytics
- [ ] Adicionar meta tags SEO
- [ ] Testar performance (Lighthouse)

---

**Desenvolvido com ❤️ para Terral Social**
