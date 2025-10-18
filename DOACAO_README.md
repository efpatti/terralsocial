# 💚 Sistema de Doações - Terral Social

Sistema completo de doações com integração ao Mercado Pago, permitindo doações únicas ou mensais via cartão de crédito, débito e PIX.

## ✨ Funcionalidades

### 🎯 Página de Doações (`/doe-agora`)

- ✅ Doações mensais recorrentes (cartão de crédito)
- ✅ Doações únicas (crédito, débito ou PIX)
- ✅ Valores pré-definidos ou personalizados
- ✅ Exemplos de impacto das doações
- ✅ Formulário intuitivo e validado
- ✅ Design responsivo e moderno
- ✅ Integração completa com Mercado Pago

### 💳 Métodos de Pagamento

| Tipo de Doação | Métodos Disponíveis             |
| -------------- | ------------------------------- |
| **Mensal**     | Cartão de Crédito               |
| **Única**      | Cartão de Crédito, Débito e PIX |

### 🔒 Segurança

- Tokenização de cartões (PCI Compliance)
- Criptografia SSL/TLS
- Nenhum dado de cartão armazenado no servidor
- Processamento 100% via Mercado Pago

## 📁 Estrutura de Arquivos

```
src/
├── app/
│   ├── doe-agora/
│   │   └── page.tsx                    # Página principal de doações
│   └── api/
│       ├── create-payment/
│       │   └── route.ts                # API para criar pagamentos
│       └── webhooks/
│           └── mercadopago/
│               └── route.ts            # Webhook para notificações
├── components/
│   ├── DonationForm.tsx               # Formulário de doação
│   └── PixModal.tsx                   # Modal com QR Code PIX
└── ...
```

## 🚀 Como Usar

### 1. Instalar Dependências

```bash
npm install mercadopago
# ou
yarn add mercadopago
```

### 2. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo e configure suas credenciais:

```bash
cp .env.local.example .env.local
```

Edite `.env.local` e adicione suas credenciais do Mercado Pago:

```env
MERCADO_PAGO_ACCESS_TOKEN=TEST-seu-token-aqui
NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY=TEST-sua-public-key-aqui
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> 📖 Veja o guia completo em: [MERCADO_PAGO_INTEGRATION.md](./MERCADO_PAGO_INTEGRATION.md)

### 3. Executar o Projeto

```bash
npm run dev
# ou
yarn dev
```

Acesse: http://localhost:3000/doe-agora

## 🧪 Testar o Sistema

### Cartões de Teste (Ambiente de Teste)

Use estes cartões no ambiente de teste do Mercado Pago:

**Mastercard - Aprovado**

- Número: `5031 4332 1540 6351`
- CVV: `123`
- Validade: Qualquer data futura

**Visa - Aprovado**

- Número: `4509 9535 6623 3704`
- CVV: `123`
- Validade: Qualquer data futura

**Mastercard - Recusado**

- Número: `5031 7557 3453 0604`
- CVV: `123`
- Validade: Qualquer data futura

**CPF para testes:**

- Use qualquer CPF válido (ex: `123.456.789-09`)

### Testar PIX

No ambiente de teste, o QR Code será gerado mas não precisa fazer pagamento real.

## 🔄 Fluxo de Pagamento

### Cartão de Crédito/Débito

```
1. Usuário preenche formulário
2. Sistema tokeniza dados do cartão (cliente)
3. Token é enviado para API
4. API processa com Mercado Pago
5. Resposta é retornada
6. Usuário vê confirmação
```

### PIX

```
1. Usuário escolhe PIX
2. API gera QR Code no Mercado Pago
3. Modal é exibido com QR Code
4. Usuário paga via app do banco
5. Webhook notifica confirmação
6. Sistema atualiza status
```

### Doação Mensal (Assinatura)

```
1. Usuário escolhe doação mensal
2. Sistema cria assinatura no Mercado Pago
3. Cobrança automática todo mês
4. Webhooks notificam sobre cada cobrança
```

## 📊 Webhooks

O sistema recebe notificações automáticas do Mercado Pago sobre:

- ✅ Pagamentos aprovados
- ⏳ Pagamentos pendentes (PIX/boleto)
- ❌ Pagamentos recusados
- 💰 Pagamentos estornados
- 📅 Cobranças mensais (assinaturas)
- 🔴 Cancelamentos de assinatura

Configure a URL do webhook no painel do Mercado Pago:

```
https://seu-site.com.br/api/webhooks/mercadopago
```

## 🎨 Customização

### Alterar Valores Pré-definidos

Edite `src/components/DonationForm.tsx`:

```typescript
const predefinedAmounts = [30, 50, 100, 200, 500]; // Altere aqui
```

### Alterar Exemplos de Impacto

Edite `src/app/doe-agora/page.tsx`:

```typescript
const impactExamples = [
 {
  amount: 30,
  description: "Sua descrição aqui",
  icon: Gift,
  color: "#3ca0e7",
 },
 // ...
];
```

### Alterar Cores

As cores principais estão definidas como:

- Verde principal: `#499D4B`
- Verde escuro: `#3d8540`

Personalize em `tailwind.config.ts` se necessário.

## 📈 Próximos Passos

### Integrações Recomendadas

1. **Banco de Dados**

   - Salvar todas as transações
   - Histórico de doadores
   - Relatórios financeiros

2. **Email**

   - Confirmação de doação
   - Recibo fiscal
   - Lembretes para doadores mensais

3. **Dashboard Admin**

   - Visualizar doações
   - Exportar relatórios
   - Gerenciar doadores recorrentes

4. **Analytics**
   - Google Analytics
   - Tracking de conversões
   - A/B testing

## 🐛 Problemas Comuns

### Erro: "Credenciais inválidas"

- Verifique se copiou as credenciais corretamente
- Certifique-se de usar credenciais de TESTE no desenvolvimento

### Modal PIX não aparece

- Verifique o console do navegador
- Confirme se a resposta da API contém `qr_code`

### Pagamento não é processado

- Verifique se descomentou o código nas APIs
- Confirme que o Mercado Pago SDK está instalado
- Veja os logs no console

## 📚 Documentação

- 📖 [Guia de Integração Completo](./MERCADO_PAGO_INTEGRATION.md)
- 🔗 [Documentação Oficial Mercado Pago](https://www.mercadopago.com.br/developers/pt/docs)
- 💳 [Cartões de Teste](https://www.mercadopago.com.br/developers/pt/docs/checkout-api/testing)

## 🆘 Suporte

Dúvidas? Entre em contato:

- 📧 Email: contato@terralsocial.org.br
- 🌐 Site: https://terralsocial.org.br

---

**Desenvolvido com ❤️ para Terral Social**
