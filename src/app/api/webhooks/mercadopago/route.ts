import { NextRequest, NextResponse } from "next/server";

/**
 * Webhook para receber notificações do Mercado Pago
 *
 * O Mercado Pago enviará notificações para esta URL sempre que houver
 * uma atualização no status de um pagamento ou assinatura.
 *
 * Documentação: https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks
 *
 * Configure esta URL no painel do Mercado Pago:
 * https://www.mercadopago.com.br/developers/panel/notifications/webhooks
 */

export async function POST(request: NextRequest) {
 try {
  const body = await request.json();
  const { type, data } = body;

  console.log("Webhook recebido:", { type, data });

  // Tipos de notificação:
  // - payment: Pagamento criado ou atualizado
  // - plan: Plano de assinatura criado ou atualizado
  // - subscription: Assinatura criada ou atualizada
  // - invoice: Fatura criada ou atualizada

  switch (type) {
   case "payment":
    await handlePaymentNotification(data.id);
    break;

   case "subscription":
   case "subscription_preapproval":
    await handleSubscriptionNotification(data.id);
    break;

   default:
    console.log(`Tipo de notificação não tratado: ${type}`);
  }

  // IMPORTANTE: Sempre retornar 200 para o Mercado Pago
  return NextResponse.json({ success: true });
 } catch (error) {
  console.error("Erro ao processar webhook:", error);
  // Mesmo em caso de erro, retornar 200 para não reenviar
  return NextResponse.json({ success: false }, { status: 200 });
 }
}

async function handlePaymentNotification(paymentId: string) {
 console.log(`Processando notificação de pagamento: ${paymentId}`);

 // TODO: Implementar quando tiver credenciais do Mercado Pago
 /*
  const mercadopago = require('mercadopago');
  
  mercadopago.configure({
    access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN!
  });

  // Buscar detalhes do pagamento
  const payment = await mercadopago.payment.get(paymentId);
  
  const status = payment.body.status;
  const amount = payment.body.transaction_amount;
  const email = payment.body.payer.email;

  console.log(`Pagamento ${paymentId}:`, {
    status,
    amount,
    email
  });

  // Aqui você pode:
  // 1. Salvar no banco de dados
  // 2. Enviar email de confirmação
  // 3. Atualizar sistema interno
  // 4. Gerar recibo fiscal

  switch (status) {
    case 'approved':
      // Pagamento aprovado
      console.log('✅ Pagamento aprovado!');
      // await enviarEmailConfirmacao(email, amount);
      // await salvarNoBanco({ paymentId, status, amount, email });
      break;

    case 'pending':
      // Aguardando pagamento (PIX, boleto)
      console.log('⏳ Aguardando pagamento...');
      break;

    case 'rejected':
      // Pagamento rejeitado
      console.log('❌ Pagamento rejeitado');
      break;

    case 'refunded':
      // Pagamento estornado
      console.log('↩️ Pagamento estornado');
      break;
  }
  */
}

async function handleSubscriptionNotification(subscriptionId: string) {
 console.log(`Processando notificação de assinatura: ${subscriptionId}`);

 // TODO: Implementar quando tiver credenciais do Mercado Pago
 /*
  const mercadopago = require('mercadopago');
  
  mercadopago.configure({
    access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN!
  });

  // Buscar detalhes da assinatura
  const subscription = await mercadopago.preapproval.get(subscriptionId);
  
  const status = subscription.body.status;
  const amount = subscription.body.auto_recurring.transaction_amount;
  const email = subscription.body.payer_email;

  console.log(`Assinatura ${subscriptionId}:`, {
    status,
    amount,
    email
  });

  switch (status) {
    case 'authorized':
      // Assinatura ativa
      console.log('✅ Assinatura ativa!');
      break;

    case 'paused':
      // Assinatura pausada
      console.log('⏸️ Assinatura pausada');
      break;

    case 'cancelled':
      // Assinatura cancelada
      console.log('❌ Assinatura cancelada');
      break;
  }
  */
}

// Permitir acesso do Mercado Pago
export const runtime = "nodejs";
