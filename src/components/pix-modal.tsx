"use client";

import { motion } from "framer-motion";
import { X, Copy, CheckCircle2, Download } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { prefix } from "@/lib/imageHelper";

interface PixModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrCode: string;
  qrCodeBase64: string;
  amount: number;
}

export default function PixModal({ isOpen, onClose, qrCode, qrCodeBase64, amount }: PixModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(qrCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${qrCodeBase64}`;
    link.download = `qr-code-doacao-${amount}.png`;
    link.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#499D4B] to-[#3d8540] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          <h2 className="text-2xl font-black mb-2">Pagamento via PIX</h2>
          <p className="text-sm opacity-90">Escaneie o QR Code ou copie o código</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Valor */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Valor da doação</p>
            <p className="text-4xl font-black text-[#499D4B]">
              R$ {amount.toFixed(2).replace(".", ",")}
            </p>
          </div>

          {/* QR Code */}
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-xl border-4 border-gray-200">
              <Image
                src={prefix(`data:image/png;base64,${qrCodeBase64}`)}
                alt="QR Code PIX"
                width={200}
                height={200}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Instruções */}
          <div className="bg-blue-50 rounded-xl p-4 space-y-2">
            <p className="font-bold text-sm text-blue-900">Como pagar:</p>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Abra o app do seu banco</li>
              <li>Escolha pagar via PIX</li>
              <li>Escaneie o QR Code ou copie o código</li>
              <li>Confirme o pagamento</li>
            </ol>
          </div>

          {/* Código PIX */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Ou copie o código PIX:
            </label>
            <div className="relative">
              <input
                type="text"
                value={qrCode}
                readOnly
                className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg bg-gray-50 text-sm font-mono"
              />
              <button
                onClick={handleCopy}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-200 rounded-lg transition-colors"
                title="Copiar código"
              >
                {copied ? (
                  <CheckCircle2 size={20} className="text-green-500" />
                ) : (
                  <Copy size={20} className="text-gray-500" />
                )}
              </button>
            </div>
            {copied && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-green-600 mt-2 font-medium"
              >
                ✓ Código copiado!
              </motion.p>
            )}
          </div>

          {/* Botões */}
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Baixar QR Code
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-[#499D4B] text-white font-bold py-3 rounded-lg hover:bg-[#3d8540] transition-colors"
            >
              Fechar
            </button>
          </div>

          {/* Aviso */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-3">
            <p className="text-xs text-yellow-800 text-center">
              <strong>⏱️ Atenção:</strong> Este QR Code expira em 30 minutos
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
