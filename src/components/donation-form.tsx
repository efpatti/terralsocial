"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { CreditCard, Calendar, Smartphone, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import PixModal from "./pix-modal";

interface DonationFormProps {
  preSelectedAmount?: number | null;
}

type DonationType = "monthly" | "once";
type PaymentMethod = "credit" | "debit" | "pix";

const predefinedAmounts = [30, 50, 100, 200, 500];

export default function DonationForm({ preSelectedAmount }: DonationFormProps) {
  const [donationType, setDonationType] = useState<DonationType>("monthly");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit");
  const [amount, setAmount] = useState<number | string>("");
  const [customAmount, setCustomAmount] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPixModal, setShowPixModal] = useState(false);
  const [pixData, setPixData] = useState({
    qrCode: "",
    qrCodeBase64: "",
    amount: 0,
  });

  // Dados do formulário
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
  });

  // Dados do cartão
  const [cardData, setCardData] = useState({
    number: "",
    holder: "",
    expiry: "",
    cvv: "",
  });

  // Atualiza o valor quando um impacto é selecionado
  useEffect(() => {
    if (preSelectedAmount) {
      setAmount(preSelectedAmount);
      setCustomAmount(false);
    }
  }, [preSelectedAmount]);

  // Valida se o formulário está completo
  const isFormValid = () => {
    const baseValid = formData.name && formData.email && formData.cpf && formData.phone && amount;

    if (paymentMethod === "pix") {
      return baseValid;
    }

    return baseValid && cardData.number && cardData.holder && cardData.expiry && cardData.cvv;
  };

  // Formata número do cartão
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  // Formata data de validade
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  // Formata CPF
  const formatCPF = (value: string) => {
    const v = value.replace(/\D/g, "");
    if (v.length <= 11) {
      return v
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    return value;
  };

  // Formata telefone
  const formatPhone = (value: string) => {
    const v = value.replace(/\D/g, "");
    if (v.length <= 11) {
      return v.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
    }
    return value;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Aqui você integrará com a API do Mercado Pago
      // Exemplo de estrutura:

      const paymentData = {
        transaction_amount: Number(amount),
        description: `Doação ${donationType === "monthly" ? "mensal" : "única"} - Terral Social`,
        payment_method_id:
          paymentMethod === "pix"
            ? "pix"
            : paymentMethod === "credit"
              ? "credit_card"
              : "debit_card",
        payer: {
          email: formData.email,
          identification: {
            type: "CPF",
            number: formData.cpf.replace(/\D/g, ""),
          },
          first_name: formData.name.split(" ")[0],
          last_name: formData.name.split(" ").slice(1).join(" "),
        },
      };

      // Se for cartão, adiciona dados do cartão
      if (paymentMethod !== "pix") {
        Object.assign(paymentData, {
          token: "card_token_aqui", // Token gerado pelo Mercado Pago SDK
          installments: 1,
        });
      }

      console.log("Dados de pagamento:", paymentData);

      // Chamada para API do Mercado Pago
      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error("Erro ao processar pagamento");
      }

      const result = await response.json();

      // Se for PIX, mostrar modal com QR Code
      if (result.status === "pending" && result.qr_code) {
        setPixData({
          qrCode: result.qr_code,
          qrCodeBase64: result.qr_code_base64,
          amount: Number(amount),
        });
        setShowPixModal(true);
        return;
      }

      // Para outros métodos, mostrar sucesso
      if (result.status === "approved" || result.status === "success") {
        setSuccess(true);

        // Reset form após 3 segundos
        setTimeout(() => {
          setSuccess(false);
          setFormData({ name: "", email: "", cpf: "", phone: "" });
          setCardData({ number: "", holder: "", expiry: "", cvv: "" });
          setAmount("");
        }, 3000);
      }
    } catch (err) {
      setError("Erro ao processar pagamento. Tente novamente.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#499D4B] to-[#3d8540] p-6 text-white">
        <h2 className="text-2xl font-black mb-2">Complete sua doação</h2>
        <p className="text-sm opacity-90">Escolha o valor e a forma de pagamento</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Tipo de Doação */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3">Tipo de doação</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setDonationType("monthly")}
              className={`p-4 rounded-xl border-2 transition-all ${
                donationType === "monthly"
                  ? "border-[#499D4B] bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Calendar
                className={`mx-auto mb-2 ${
                  donationType === "monthly" ? "text-[#499D4B]" : "text-gray-400"
                }`}
                size={24}
              />
              <div className="text-sm font-bold">Mensal</div>
              <div className="text-xs text-gray-500">Recorrente</div>
            </button>

            <button
              type="button"
              onClick={() => setDonationType("once")}
              className={`p-4 rounded-xl border-2 transition-all ${
                donationType === "once"
                  ? "border-[#499D4B] bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <CreditCard
                className={`mx-auto mb-2 ${
                  donationType === "once" ? "text-[#499D4B]" : "text-gray-400"
                }`}
                size={24}
              />
              <div className="text-sm font-bold">Única</div>
              <div className="text-xs text-gray-500">Uma vez</div>
            </button>
          </div>
        </div>

        {/* Valor da Doação */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3">Valor da doação</label>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {predefinedAmounts.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => {
                  setAmount(preset);
                  setCustomAmount(false);
                }}
                className={`py-3 rounded-lg border-2 font-bold transition-all ${
                  amount === preset && !customAmount
                    ? "border-[#499D4B] bg-green-50 text-[#499D4B]"
                    : "border-gray-200 hover:border-gray-300 text-gray-700"
                }`}
              >
                R$ {preset}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              setCustomAmount(true);
              setAmount("");
            }}
            className={`w-full py-3 rounded-lg border-2 font-bold transition-all ${
              customAmount
                ? "border-[#499D4B] bg-green-50 text-[#499D4B]"
                : "border-gray-200 hover:border-gray-300 text-gray-700"
            }`}
          >
            Outro valor
          </button>

          <AnimatePresence>
            {customAmount && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3"
              >
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Digite o valor"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#499D4B] focus:outline-none"
                  min="1"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Método de Pagamento */}
        {donationType === "once" && (
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Método de pagamento
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("credit")}
                className={`p-3 rounded-xl border-2 transition-all ${
                  paymentMethod === "credit"
                    ? "border-[#499D4B] bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <CreditCard
                  className={`mx-auto mb-1 ${
                    paymentMethod === "credit" ? "text-[#499D4B]" : "text-gray-400"
                  }`}
                  size={20}
                />
                <div className="text-xs font-bold">Crédito</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("debit")}
                className={`p-3 rounded-xl border-2 transition-all ${
                  paymentMethod === "debit"
                    ? "border-[#499D4B] bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <CreditCard
                  className={`mx-auto mb-1 ${
                    paymentMethod === "debit" ? "text-[#499D4B]" : "text-gray-400"
                  }`}
                  size={20}
                />
                <div className="text-xs font-bold">Débito</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("pix")}
                className={`p-3 rounded-xl border-2 transition-all ${
                  paymentMethod === "pix"
                    ? "border-[#499D4B] bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Smartphone
                  className={`mx-auto mb-1 ${
                    paymentMethod === "pix" ? "text-[#499D4B]" : "text-gray-400"
                  }`}
                  size={20}
                />
                <div className="text-xs font-bold">PIX</div>
              </button>
            </div>
          </div>
        )}

        {donationType === "monthly" && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Doação mensal:</strong> Apenas cartão de crédito disponível para recorrência.
            </p>
          </div>
        )}

        {/* Dados Pessoais */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-800">Seus dados</h3>

          <input
            type="text"
            placeholder="Nome completo"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#499D4B] focus:outline-none"
            required
          />

          <input
            type="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#499D4B] focus:outline-none"
            required
          />

          <input
            type="text"
            placeholder="CPF"
            value={formData.cpf}
            onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })}
            maxLength={14}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#499D4B] focus:outline-none"
            required
          />

          <input
            type="text"
            placeholder="Telefone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
            maxLength={15}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#499D4B] focus:outline-none"
            required
          />
        </div>

        {/* Dados do Cartão */}
        {paymentMethod !== "pix" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-4"
          >
            <h3 className="font-bold text-gray-800">Dados do cartão</h3>

            <input
              type="text"
              placeholder="Número do cartão"
              value={cardData.number}
              onChange={(e) =>
                setCardData({
                  ...cardData,
                  number: formatCardNumber(e.target.value),
                })
              }
              maxLength={19}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#499D4B] focus:outline-none"
              required
            />

            <input
              type="text"
              placeholder="Nome no cartão"
              value={cardData.holder}
              onChange={(e) =>
                setCardData({
                  ...cardData,
                  holder: e.target.value.toUpperCase(),
                })
              }
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#499D4B] focus:outline-none"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Validade (MM/AA)"
                value={cardData.expiry}
                onChange={(e) =>
                  setCardData({
                    ...cardData,
                    expiry: formatExpiry(e.target.value),
                  })
                }
                maxLength={5}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#499D4B] focus:outline-none"
                required
              />

              <input
                type="text"
                placeholder="CVV"
                value={cardData.cvv}
                onChange={(e) =>
                  setCardData({
                    ...cardData,
                    cvv: e.target.value.replace(/\D/g, ""),
                  })
                }
                maxLength={4}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#499D4B] focus:outline-none"
                required
              />
            </div>
          </motion.div>
        )}

        {/* Mensagem de PIX */}
        {paymentMethod === "pix" && donationType === "once" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-green-50 border-2 border-green-200 rounded-lg p-4"
          >
            <p className="text-sm text-green-800">
              Após confirmar, você receberá o QR Code PIX para realizar o pagamento.
            </p>
          </motion.div>
        )}

        {/* Erro */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-start gap-3"
            >
              <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
              <p className="text-sm text-red-800">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sucesso */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center"
            >
              <CheckCircle2 className="mx-auto text-green-500 mb-3" size={48} />
              <h3 className="text-xl font-black text-green-800 mb-2">
                Doação realizada com sucesso!
              </h3>
              <p className="text-sm text-green-700">
                Obrigado por fazer parte dessa transformação! ❤️
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botão de Submit */}
        {!success && (
          <button
            type="submit"
            disabled={isProcessing || !isFormValid()}
            className="w-full bg-gradient-to-r from-[#499D4B] to-[#3d8540] text-white font-black py-4 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Processando...
              </>
            ) : (
              <>
                Confirmar doação de R$ {amount || "0"}
                {donationType === "monthly" && "/mês"}
              </>
            )}
          </button>
        )}

        {/* Informações de Segurança */}
        <div className="text-center text-xs text-gray-500 pt-4 border-t-2 border-gray-100">
          <p>🔒 Seus dados estão protegidos com criptografia SSL</p>
          <p className="mt-1">Pagamento processado pelo Mercado Pago</p>
        </div>
      </form>

      {/* Modal PIX */}
      <PixModal
        isOpen={showPixModal}
        onClose={() => setShowPixModal(false)}
        qrCode={pixData.qrCode}
        qrCodeBase64={pixData.qrCodeBase64}
        amount={pixData.amount}
      />
    </motion.div>
  );
}
