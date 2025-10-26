"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
 Heart,
 CreditCard,
 Calendar,
 Users,
 Gift,
 CheckCircle2,
 ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import DonationForm from "@/components/donation-form";

const impactExamples = [
 {
  amount: 30,
  description: "Fornece material escolar para 1 criança por mês",
  icon: Gift,
  color: "#3ca0e7",
 },
 {
  amount: 50,
  description: "Custeia 1 semana de oficinas de artes para 5 crianças",
  icon: Users,
  color: "#499D4B",
 },
 {
  amount: 100,
  description: "Mantém 1 oficina completa funcionando por 1 semana",
  icon: Calendar,
  color: "#E74C3C",
 },
 {
  amount: 200,
  description: "Apoia todas as atividades mensais de 10 famílias",
  icon: Heart,
  color: "#8B5CF6",
 },
];

export default function DoeAgora() {
 const [selectedImpact, setSelectedImpact] = useState<number | null>(null);

 return (
  <div className="min-h-screen bg-gradient-to-br from-[#FFFBF5] via-white to-green-50">
   {/* Index */}
   <div className="bg-gradient-to-r from-[#499D4B] to-[#3d8540] text-white py-8 px-4">
    <div className="max-w-7xl mx-auto">
     <Link
      href="/"
      className="inline-flex items-center gap-2 mb-4 text-white/80 hover:text-white transition-colors"
     >
      <ArrowLeft size={20} />
      Voltar para home
     </Link>
     <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
     >
      <h1 className="text-4xl md:text-5xl font-black mb-4">
       Doe Agora e Transforme Vidas
      </h1>
      <p className="text-lg md:text-xl opacity-95 max-w-3xl">
       Sua doação mantém nossos projetos sociais ativos, levando educação,
       cultura e esperança para centenas de pessoas no Terreirão.
      </p>
     </motion.div>
    </div>
   </div>

   <div className="max-w-7xl mx-auto px-4 py-12">
    <div className="grid lg:grid-cols-2 gap-8">
     {/* Coluna da Esquerda - Informações */}
     <div className="space-y-8">
      {/* Por que doar */}
      <motion.div
       initial={{ opacity: 0, x: -20 }}
       animate={{ opacity: 1, x: 0 }}
       transition={{ delay: 0.2 }}
       className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100"
      >
       <h2 className="text-2xl font-black text-gray-800 mb-4 flex items-center gap-3">
        <Heart className="text-[#499D4B]" size={28} fill="#499D4B" />
        Por que doar?
       </h2>
       <div className="space-y-4 text-gray-700">
        <div className="flex items-start gap-3">
         <CheckCircle2
          className="text-[#499D4B] mt-1 flex-shrink-0"
          size={20}
         />
         <p>
          <strong>Transparência total:</strong> Você acompanha como cada centavo
          é usado
         </p>
        </div>
        <div className="flex items-start gap-3">
         <CheckCircle2
          className="text-[#499D4B] mt-1 flex-shrink-0"
          size={20}
         />
         <p>
          <strong>Impacto direto:</strong> Sua doação vai direto para quem
          precisa
         </p>
        </div>
        <div className="flex items-start gap-3">
         <CheckCircle2
          className="text-[#499D4B] mt-1 flex-shrink-0"
          size={20}
         />
         <p>
          <strong>32 anos de história:</strong> Somos uma instituição
          consolidada e confiável
         </p>
        </div>
        <div className="flex items-start gap-3">
         <CheckCircle2
          className="text-[#499D4B] mt-1 flex-shrink-0"
          size={20}
         />
         <p>
          <strong>Recibo para dedução:</strong> Sua doação pode ser deduzida no
          IR
         </p>
        </div>
       </div>
      </motion.div>

      {/* Exemplos de Impacto */}
      <motion.div
       initial={{ opacity: 0, x: -20 }}
       animate={{ opacity: 1, x: 0 }}
       transition={{ delay: 0.3 }}
       className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100"
      >
       <h2 className="text-2xl font-black text-gray-800 mb-6">
        Veja o impacto da sua doação
       </h2>
       <div className="space-y-4">
        {impactExamples.map((example, index) => {
         const Icon = example.icon;
         return (
          <motion.div
           key={index}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.4 + index * 0.1 }}
           onClick={() => setSelectedImpact(example.amount)}
           className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
            selectedImpact === example.amount
             ? "border-[#499D4B] bg-green-50"
             : "border-gray-200 hover:border-gray-300"
           }`}
          >
           <div className="flex items-start gap-4">
            <div
             className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
             style={{ backgroundColor: `${example.color}15` }}
            >
             <Icon size={24} style={{ color: example.color }} />
            </div>
            <div className="flex-1">
             <div className="flex items-baseline gap-2 mb-1">
              <span
               className="text-2xl font-black"
               style={{ color: example.color }}
              >
               R$ {example.amount}
              </span>
              <span className="text-sm text-gray-500">/mês</span>
             </div>
             <p className="text-sm text-gray-600 leading-relaxed">
              {example.description}
             </p>
            </div>
           </div>
          </motion.div>
         );
        })}
       </div>
      </motion.div>

      {/* Selo de Segurança */}
      <motion.div
       initial={{ opacity: 0, x: -20 }}
       animate={{ opacity: 1, x: 0 }}
       transition={{ delay: 0.7 }}
       className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200"
      >
       <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
         <CreditCard size={32} className="text-white" />
        </div>
        <div>
         <h3 className="font-black text-gray-800 mb-1">
          Pagamento 100% Seguro
         </h3>
         <p className="text-sm text-gray-600">
          Processado pelo Mercado Pago com criptografia de ponta
         </p>
        </div>
       </div>
      </motion.div>
     </div>

     {/* Coluna da Direita - Formulário de Doação */}
     <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="lg:sticky lg:top-8 h-fit"
     >
      <DonationForm preSelectedAmount={selectedImpact} />
     </motion.div>
    </div>
   </div>

   {/* Testemunhos Rápidos */}
   <section className="bg-white py-16 px-4 mt-12">
    <div className="max-w-7xl mx-auto">
     <h2 className="text-3xl md:text-4xl font-black text-center mb-12 text-gray-800">
      Quem doa, <span className="text-[#499D4B]">transforma</span>
     </h2>
     <div className="grid md:grid-cols-3 gap-6">
      {[
       {
        name: "Maria Silva",
        role: "Doadora mensal",
        text:
         "Saber que minha doação ajuda crianças a terem acesso à educação me enche de alegria!",
       },
       {
        name: "João Santos",
        role: "Doador único",
        text:
         "Processo super fácil e transparente. Recomendo a todos que possam contribuir!",
       },
       {
        name: "Ana Costa",
        role: "Doadora mensal",
        text:
         "Acompanho o trabalho da Terral há anos. É inspirador ver o impacto real na comunidade.",
       },
      ].map((testimonial, index) => (
       <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border-2 border-gray-100"
       >
        <p className="text-gray-700 mb-4 italic">
         &ldquo;{testimonial.text}&rdquo;
        </p>
        <div>
         <p className="font-bold text-gray-800">{testimonial.name}</p>
         <p className="text-sm text-gray-500">{testimonial.role}</p>
        </div>
       </motion.div>
      ))}
     </div>
    </div>
   </section>
  </div>
 );
}
