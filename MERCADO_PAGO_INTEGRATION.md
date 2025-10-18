# 💳 Integração com Mercado Pago - Guia Completo

Este guia explica como completar a integração com o Mercado Pago para aceitar doações no site da Terral Social.

## 📋 Pré-requisitos

1. **Conta no Mercado Pago**

   - Crie uma conta em: https://www.mercadopago.com.br/
   - Acesse o painel de desenvolvedores: https://www.mercadopago.com.br/developers

2. **Credenciais**
   - Acesse: https://www.mercadopago.com.br/developers/panel/credentials
   - Você verá duas opções: **Produção** e **Teste**
   - Para desenvolvimento, use as credenciais de **Teste**
   - Para o site real, use as credenciais de **Produção**

## 🔧 Configuração

### 1. Instalar dependências

```bash
npm install mercadopago
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Credenciais do Mercado Pago (TESTE para desenvolvimento)
MERCADO_PAGO_ACCESS_TOKEN=TEST-1234567890-xxxxxx-xxxxxxxxxxxxxxx
NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY=TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# URL base do seu site (use http://localhost:3000 em desenvolvimento)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**⚠️ IMPORTANTE:** Nunca comite o arquivo `.env.local` no Git!

### 3. Adicionar SDK do Mercado Pago no HTML

Edite o arquivo `src/app/layout.tsx` e adicione o script do Mercado Pago no `<head>`:

```tsx
import Script from "next/script";

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
  <html lang="pt-BR">
   <head>
    <Script
     src="https://sdk.mercadopago.com/js/v2"
     strategy="beforeInteractive"
    />
   </head>
   <body>{children}</body>
  </html>
 );
}
```

### 4. Descomentar código nos arquivos de API

Os arquivos já foram criados com código comentado:

1. **`src/app/api/create-payment/route.ts`**

   - Descomente as seções marcadas com `// TODO:`
   - Implemente a lógica real do Mercado Pago

2. **`src/app/api/webhooks/mercadopago/route.ts`**
   - Descomente as seções marcadas com `// TODO:`
   - Implemente a lógica de notificações

### 5. Atualizar o componente DonationForm

Edite `src/components/DonationForm.tsx` e atualize a função `handleSubmit`:

```typescript
// Substituir a linha:
// const response = await fetch('/api/create-payment', {

// Por:
const response = await fetch("/api/create-payment", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify(paymentData),
});

if (!response.ok) {
 throw new Error("Erro ao processar pagamento");
}

const result = await response.json();

// Tratar resposta do PIX
if (result.status === "pending" && result.qr_code) {
 // Mostrar QR Code para o usuário
 // Você pode criar um modal com o QR Code
 console.log("QR Code:", result.qr_code);
}

// Tratar pagamento aprovado
if (result.status === "approved") {
 setSuccess(true);
}
```

## 🔒 Segurança - Tokenização de Cartão

Para maior segurança, **NUNCA** envie dados do cartão diretamente para seu servidor.
Use a tokenização do Mercado Pago:

1. **Instalar SDK no cliente:**

```typescript
// No DonationForm.tsx, adicionar useEffect:
useEffect(() => {
 const mp = new window.MercadoPago(
  process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!
 );
 setMercadoPago(mp);
}, []);
```

2. **Criar token antes de enviar:**

```typescript
// Antes de fazer o submit, criar token:
const cardToken = await mercadoPago.createCardToken({
 cardNumber: cardData.number.replace(/\s/g, ""),
 cardholderName: cardData.holder,
 cardExpirationMonth: cardData.expiry.split("/")[0],
 cardExpirationYear: "20" + cardData.expiry.split("/")[1],
 securityCode: cardData.cvv,
 identificationType: "CPF",
 identificationNumber: formData.cpf.replace(/\D/g, ""),
});

// Enviar apenas o token:
paymentData.token = cardToken.id;
```

## 🔔 Configurar Webhooks

1. Acesse: https://www.mercadopago.com.br/developers/panel/notifications/webhooks
2. Adicione a URL do webhook: `https://seu-site.com.br/api/webhooks/mercadopago`
3. Selecione os eventos que deseja receber

## 🧪 Testar a Integração

### Cartões de teste (ambiente de teste):

| Cartão              | Número              | CVV | Validade |
| ------------------- | ------------------- | --- | -------- |
| Mastercard aprovado | 5031 4332 1540 6351 | 123 | 11/25    |
| Visa aprovado       | 4509 9535 6623 3704 | 123 | 11/25    |
| Mastercard recusado | 5031 7557 3453 0604 | 123 | 11/25    |

### CPF de teste:

- Use qualquer CPF válido (pode gerar em: https://www.4devs.com.br/gerador_de_cpf)

### Testar PIX:

- No ambiente de teste, o QR Code será gerado mas não precisa pagar de verdade
- Você pode simular o pagamento no painel do Mercado Pago

## 📊 Monitorar Pagamentos

Todos os pagamentos podem ser visualizados em:

- https://www.mercadopago.com.br/activities

## 🚀 Ir para Produção

1. **Obter credenciais de produção**

   - Acesse: https://www.mercadopago.com.br/developers/panel/credentials
   - Copie o Access Token e Public Key de **PRODUÇÃO**

2. **Atualizar variáveis de ambiente**

   ```env
   MERCADO_PAGO_ACCESS_TOKEN=APP-1234567890-xxxxxx-xxxxxxxxxxxxxxx
   NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY=APP-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   NEXT_PUBLIC_BASE_URL=https://terralsocial.org.br
   ```

3. **Atualizar webhook**

   - Configure a URL de produção no painel do Mercado Pago

4. **Testar em produção**
   - Faça testes com valores reais baixos
   - Verifique se os webhooks estão sendo recebidos
   - Confirme o recebimento do dinheiro na conta

## 💡 Dicas

- **Logs:** Sempre logue as transações para debug
- **Banco de dados:** Salve todas as transações no seu banco
- **Email:** Envie confirmações por email aos doadores
- **Recibo:** Gere recibos para dedução de IR
- **Monitoramento:** Configure alertas para pagamentos rejeitados

## 📚 Documentação Oficial

- [Guia de Integração](https://www.mercadopago.com.br/developers/pt/docs/checkout-api/landing)
- [API Reference](https://www.mercadopago.com.br/developers/pt/reference)
- [Webhooks](https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks)
- [Cartões de teste](https://www.mercadopago.com.br/developers/pt/docs/checkout-api/testing)

## 🆘 Suporte

- [Central de Ajuda](https://www.mercadopago.com.br/developers/pt/support)
- [Comunidade](https://www.mercadopago.com.br/developers/pt/community)

---

**Desenvolvido com ❤️ para Terral Social**
