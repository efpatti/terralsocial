# 🚀 Guia Rápido - Novas Páginas

## ✅ Páginas Criadas

### 1. 🛍️ Seja Cliente do Bazar

**URL:** `/como-ajudar/seja-cliente-do-bazar`

**O que faz:**

- Apresenta o bazar da instituição
- Mostra produtos disponíveis (roupas, acessórios, calçados, artesanato)
- Exibe localização e horários
- Incentiva visitas presenciais

**Principais seções:**

- Como funciona (3 passos)
- Produtos disponíveis (4 categorias interativas)
- Benefícios (4 motivos para comprar)
- Localização e horários
- Depoimentos de clientes
- CTAs para visitar

---

### 2. 🙋 Seja Voluntário

**URL:** `/como-ajudar/seja-voluntario`

**O que faz:**

- Recruta voluntários para a instituição
- Apresenta áreas de atuação
- Coleta inscrições via formulário
- Mostra benefícios do voluntariado

**Principais seções:**

- Por que ser voluntário (4 benefícios)
- Áreas de atuação (6 opções)
- Requisitos
- Como funciona (5 passos)
- Formulário de inscrição
- Depoimentos de voluntários
- CTAs para contato

---

## 🎯 Atualizações Feitas

### Página Inicial (`/`)

- ✅ Botão "Doar Agora" agora redireciona para `/como-ajudar/doe-agora`
- ✅ Botão "Seja Voluntário" agora redireciona para `/como-ajudar/seja-voluntario`

---

## ⚙️ Configurações Necessárias

### 1. Atualizar Informações do Bazar

Edite: `src/app/como-ajudar/seja-cliente-do-bazar/page.tsx`

**Procure por (linha ~290):**

```typescript
Rua da Terral Social, 123
Terreirão - Cidade/Estado
CEP: 12345-678
```

→ Substitua pelo endereço real

**Procure por (linha ~300):**

```typescript
Segunda a Sexta: 9h às 17h
Sábado: 9h às 13h
```

→ Ajuste os horários reais

**Procure por (linha ~315-320):**

```typescript
href = "tel:+5511999999999";
href = "mailto:bazar@terralsocial.org.br";
```

→ Substitua pelos contatos reais

### 2. Atualizar Informações do Voluntariado

Edite: `src/app/como-ajudar/seja-voluntario/page.tsx`

**Procure por (linha ~580-590):**

```typescript
href = "mailto:voluntarios@terralsocial.org.br";
href = "tel:+5511999999999";
```

→ Substitua pelos contatos reais

### 3. Implementar Envio do Formulário

**O formulário está simulado!** Para funcionar de verdade:

1. Crie uma API route em: `src/app/api/volunteer-application/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
 try {
  const data = await request.json();

  // Aqui você pode:
  // 1. Salvar no banco de dados
  // 2. Enviar email para a equipe
  // 3. Enviar email de confirmação para o voluntário

  console.log("Nova inscrição:", data);

  return NextResponse.json({ success: true });
 } catch (error) {
  return NextResponse.json(
   { error: "Erro ao processar inscrição" },
   { status: 500 }
  );
 }
}
```

2. Descomente o código em `seja-voluntario/page.tsx` (linha ~170):

```typescript
const response = await fetch("/api/volunteer-application", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify(formData),
});
```

---

## 🎨 Personalização

### Adicionar Nova Área de Voluntariado

Em `src/app/como-ajudar/seja-voluntario/page.tsx`:

```typescript
const volunteerAreas = [
 // ... áreas existentes
 {
  title: "Minha Nova Área",
  icon: IconeDoLucide, // Escolha em lucide.dev
  description: "Descrição da área",
  opportunities: ["Atividade 1", "Atividade 2", "Atividade 3"],
  color: "#FF6B6B", // Cor em hexadecimal
 },
];
```

### Adicionar Nova Categoria de Produto no Bazar

Em `src/app/como-ajudar/seja-cliente-do-bazar/page.tsx`:

```typescript
const products = [
 // ... produtos existentes
 {
  category: "Eletrônicos",
  icon: Smartphone, // Ícone do Lucide
  items: ["Celulares", "Tablets", "Fones", "Carregadores"],
  color: "#9333EA",
 },
];
```

---

## 📱 Testar

```bash
npm run dev
```

Acesse:

- http://localhost:3000/como-ajudar/seja-cliente-do-bazar
- http://localhost:3000/como-ajudar/seja-voluntario
- http://localhost:3000 (testar botões atualizados)

---

## 📋 To-Do List

### Obrigatório (antes do deploy):

- [ ] Atualizar endereço do bazar
- [ ] Atualizar horários de funcionamento
- [ ] Atualizar telefones de contato
- [ ] Atualizar emails de contato
- [ ] Implementar envio do formulário de voluntariado

### Recomendado:

- [ ] Adicionar fotos reais do bazar
- [ ] Adicionar fotos de voluntários
- [ ] Configurar Google Maps (link real)
- [ ] Integrar com sistema de email
- [ ] Adicionar link no menu de navegação
- [ ] Configurar Analytics

### Futuro:

- [ ] Galeria de produtos do bazar
- [ ] Portal do voluntário (login)
- [ ] Sistema de agendamento
- [ ] Banco de dados de inscrições
- [ ] Painel administrativo

---

## 🆘 Precisa de Ajuda?

### Problemas Comuns:

**Página não carrega:**

- Verifique se está na pasta correta
- Execute `npm run dev`
- Limpe o cache do navegador

**Formulário não envia:**

- É esperado! Implemente a API primeiro
- Veja instruções acima

**Links não funcionam:**

- Verifique se atualizou os caminhos
- Use caminhos absolutos começando com `/`

---

## 📚 Documentação Completa

Para mais detalhes, veja:

- **ENGAJAMENTO_README.md** - Documentação completa das páginas
- **DOACAO_README.md** - Sistema de doações
- **PROXIMOS_PASSOS.md** - Checklist de implementação

---

**Tudo pronto para transformar vidas! 🎉**
