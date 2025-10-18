import { NextRequest, NextResponse } from "next/server";

/**
 * API Route para criar pagamentos no Mercado Pago
 *
 * Documentação: https://www.mercadopago.com.br/developers/pt/docs/checkout-api/integration-configuration/card/integrate-via-cardform
 *
 * IMPORTANTE:
 * 1. Instale o SDK: npm install mercadopago
 * 2. Configure suas credenciais no arquivo .env.local:
 *    MERCADO_PAGO_ACCESS_TOKEN=seu_access_token_aqui
 *    NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY=sua_public_key_aqui
 *
 * 3. Para obter suas credenciais:
 *    - Acesse: https://www.mercadopago.com.br/developers/panel/credentials
 *    - Use as credenciais de PRODUÇÃO para ambiente real
 *    - Use as credenciais de TESTE para desenvolvimento
 */

interface PaymentData {
 transaction_amount: number;
 description: string;
 payment_method_id: string;
 token?: string;
 payer: {
  email: string;
  identification: {
   type: string;
   number: string;
  };
  first_name: string;
  last_name: string;
 };
 installments?: number;
 isRecurring?: boolean;
}

export async function POST(request: NextRequest) {
 try {
  const body: PaymentData = await request.json();

  // Validação básica
  if (!body.transaction_amount || !body.payer || !body.payment_method_id) {
   return NextResponse.json(
    { error: "Dados de pagamento incompletos" },
    { status: 400 }
   );
  }

  // TODO: Descomente e configure quando tiver as credenciais do Mercado Pago
  /*
    const mercadopago = require('mercadopago');
    
    mercadopago.configure({
      access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN!
    });

    // Para pagamento único (cartão ou PIX)
    if (!body.isRecurring) {
      const payment = await mercadopago.payment.create({
        transaction_amount: body.transaction_amount,
        description: body.description,
        payment_method_id: body.payment_method_id,
        token: body.token,
        installments: body.installments || 1,
        payer: {
          email: body.payer.email,
          identification: {
            type: body.payer.identification.type,
            number: body.payer.identification.number,
          },
          first_name: body.payer.first_name,
          last_name: body.payer.last_name,
        },
        notification_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhooks/mercadopago`,
      });

      // Se for PIX, retornar QR Code
      if (body.payment_method_id === 'pix') {
        return NextResponse.json({
          status: 'pending',
          qr_code: payment.body.point_of_interaction.transaction_data.qr_code,
          qr_code_base64: payment.body.point_of_interaction.transaction_data.qr_code_base64,
          ticket_url: payment.body.point_of_interaction.transaction_data.ticket_url,
        });
      }

      return NextResponse.json({
        status: payment.body.status,
        id: payment.body.id,
        status_detail: payment.body.status_detail,
      });
    }

    // Para pagamento recorrente (assinatura mensal)
    else {
      const preapproval = await mercadopago.preapproval.create({
        reason: body.description,
        auto_recurring: {
          frequency: 1,
          frequency_type: "months",
          transaction_amount: body.transaction_amount,
          currency_id: "BRL",
        },
        payer_email: body.payer.email,
        card_token_id: body.token,
        back_url: `${process.env.NEXT_PUBLIC_BASE_URL}/doe-agora?success=true`,
        status: "authorized",
      });

      return NextResponse.json({
        status: 'success',
        subscription_id: preapproval.body.id,
        init_point: preapproval.body.init_point,
      });
    }
    */

  // Resposta mockada para desenvolvimento (REMOVA quando integrar de verdade)
  console.log("Dados recebidos:", body);

  // Simula sucesso para cartão
  if (body.payment_method_id !== "pix") {
   return NextResponse.json({
    status: "approved",
    id: `MOCK_${Date.now()}`,
    status_detail: "accredited",
   });
  }

  // Simula resposta PIX
  return NextResponse.json({
   status: "pending",
   qr_code: "00020126580014br.gov.bcb.pix...",
   qr_code_base64: "iVBORw0KGgoAAAANSUhEUgAA...",
   ticket_url: "https://www.mercadopago.com.br/sandbox/payments/123456/ticket",
  });
 } catch (error) {
  console.error("Erro ao processar pagamento:", error);
  return NextResponse.json(
   { error: "Erro ao processar pagamento" },
   { status: 500 }
  );
 }
}
