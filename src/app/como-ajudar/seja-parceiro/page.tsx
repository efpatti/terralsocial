"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
 Handshake,
 Building2,
 Heart,
 Users,
 TrendingUp,
 Award,
 CheckCircle2,
 ArrowLeft,
 Mail,
 Phone,
 Loader2,
 AlertCircle,
 DollarSign,
 Megaphone,
 Package,
 Calendar,
} from "lucide-react";
import Link from "next/link";

const partnershipTypes = [
 {
  title: "Apoio Financeiro",
  icon: DollarSign,
  description:
   "Contribua com doações regulares ou patrocínios de projetos específicos",
  benefits: [
   "Visibilidade da marca em eventos",
   "Relatórios de impacto social",
   "Certificado de empresa parceira",
  ],
  color: "#499D4B",
 },
 {
  title: "Apoio em Produtos/Serviços",
  icon: Package,
  description:
   "Doe materiais, equipamentos ou serviços essenciais para nossas atividades",
  benefits: [
   "Reconhecimento público",
   "Material de divulgação",
   "Fortalecimento da marca",
  ],
  color: "#3ca0e7",
 },
 {
  title: "Divulgação",
  icon: Megaphone,
  description:
   "Ajude a divulgar nosso trabalho através de seus canais de comunicação",
  benefits: [
   "Associação a causa social",
   "Conteúdo para responsabilidade social",
   "Networking com outras empresas",
  ],
  color: "#E74C3C",
 },
 {
  title: "Voluntariado Corporativo",
  icon: Users,
  description: "Engaje sua equipe em ações voluntárias e programas sociais",
  benefits: [
   "Team building diferenciado",
   "Desenvolvimento de soft skills",
   "Propósito para colaboradores",
  ],
  color: "#8B5CF6",
 },
];

const benefits = [
 {
  icon: Heart,
  title: "Impacto Social Real",
  description:
   "Transforme vidas e contribua para o desenvolvimento da comunidade",
 },
 {
  icon: Award,
  title: "Reconhecimento",
  description: "Sua marca associada a uma causa nobre e respeitada",
 },
 {
  icon: TrendingUp,
  title: "ESG e Responsabilidade Social",
  description: "Fortaleça seus indicadores de sustentabilidade",
 },
 {
  icon: Users,
  title: "Engajamento de Equipe",
  description: "Motive e una seus colaboradores em torno de um propósito",
 },
];

const currentPartners = [
 "Empresa A - Tecnologia",
 "Empresa B - Alimentação",
 "Empresa C - Educação",
 "Empresa D - Vestuário",
];

export default function SejaUmParceiro() {
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [submitSuccess, setSubmitSuccess] = useState(false);
 const [submitError, setSubmitError] = useState<string | null>(null);

 const [formData, setFormData] = useState({
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  partnershipType: "",
  message: "",
 });

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitError(null);

  try {
   // Simular envio (substituir por API real)
   await new Promise((resolve) => setTimeout(resolve, 2000));

   // TODO: Implementar envio real do formulário
   console.log("Formulário de parceria enviado:", formData);

   setSubmitSuccess(true);
   setFormData({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    partnershipType: "",
    message: "",
   });

   setTimeout(() => {
    setSubmitSuccess(false);
   }, 5000);
  } catch (error) {
   setSubmitError("Erro ao enviar formulário. Tente novamente.");
   console.error(error);
  } finally {
   setIsSubmitting(false);
  }
 };

 const isFormValid = () => {
  return (
   formData.companyName &&
   formData.contactName &&
   formData.email &&
   formData.phone &&
   formData.partnershipType
  );
 };

 return (
  <div className="min-h-screen bg-gradient-to-br from-[#FFFBF5] via-white to-blue-50">
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
      <div className="flex items-center gap-3 mb-4">
       <Handshake size={48} />
       <h1 className="text-4xl md:text-5xl font-black">Seja um Parceiro</h1>
      </div>
      <p className="text-lg md:text-xl opacity-95 max-w-3xl">
       Empresas que se unem à Terral Social transformam negócios em agentes de
       mudança. Juntos, construímos um futuro melhor para nossa comunidade.
      </p>
     </motion.div>
    </div>
   </div>

   <div className="max-w-7xl mx-auto px-4 py-12">
    {/* Por que ser parceiro */}
    <motion.section
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ delay: 0.2 }}
     className="mb-16"
    >
     <h2 className="text-3xl md:text-4xl font-black text-center mb-4">
      Por que ser <span className="text-[#499D4B]">parceiro?</span>
     </h2>
     <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
      Uma parceria que vai além do negócio e gera valor real para todos
     </p>
     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {benefits.map((benefit, index) => {
       const Icon = benefit.icon;
       return (
        <motion.div
         key={index}
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ delay: index * 0.1 }}
         className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 text-center"
        >
         <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon size={28} className="text-[#499D4B]" />
         </div>
         <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
         <p className="text-sm text-gray-600">{benefit.description}</p>
        </motion.div>
       );
      })}
     </div>
    </motion.section>

    {/* Tipos de Parceria */}
    <motion.section
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     className="mb-16"
    >
     <h2 className="text-3xl md:text-4xl font-black text-center mb-4">
      Formas de <span className="text-[#499D4B]">Parceria</span>
     </h2>
     <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
      Escolha a modalidade que melhor se encaixa com sua empresa
     </p>
     <div className="grid md:grid-cols-2 gap-6">
      {partnershipTypes.map((type, index) => {
       const Icon = type.icon;
       return (
        <motion.div
         key={index}
         initial={{ opacity: 0, scale: 0.9 }}
         whileInView={{ opacity: 1, scale: 1 }}
         viewport={{ once: true }}
         transition={{ delay: index * 0.1 }}
         className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-gray-300 transition-all"
        >
         <div
          className="w-16 h-16 rounded-xl flex items-center justify-center mb-4"
          style={{ backgroundColor: `${type.color}15` }}
         >
          <Icon size={32} style={{ color: type.color }} />
         </div>
         <h3 className="text-2xl font-black mb-3" style={{ color: type.color }}>
          {type.title}
         </h3>
         <p className="text-gray-600 mb-4">{type.description}</p>
         <div className="space-y-2">
          <p className="text-sm font-bold text-gray-800">Benefícios:</p>
          {type.benefits.map((benefit, i) => (
           <div key={i} className="flex items-start gap-2">
            <CheckCircle2
             size={16}
             className="text-green-500 mt-0.5 flex-shrink-0"
            />
            <span className="text-sm text-gray-600">{benefit}</span>
           </div>
          ))}
         </div>
        </motion.div>
       );
      })}
     </div>
    </motion.section>

    {/* Formulário e Informações */}
    <div className="grid lg:grid-cols-2 gap-8 mb-16">
     {/* Informações */}
     <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="space-y-8"
     >
      <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
       <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
        <Building2 className="text-[#499D4B]" size={28} />
        Empresas Parceiras
       </h2>
       <p className="text-gray-600 mb-6">
        Empresas que já confiam e apoiam nosso trabalho:
       </p>
       <ul className="space-y-3">
        {currentPartners.map((partner, index) => (
         <motion.li
          key={index}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-3 text-gray-700"
         >
          <CheckCircle2 className="text-[#499D4B]" size={20} />
          {partner}
         </motion.li>
        ))}
       </ul>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 border-2 border-green-200">
       <h3 className="text-xl font-black mb-4 text-gray-800 flex items-center gap-2">
        <Calendar className="text-[#499D4B]" size={24} />
        Como funciona?
       </h3>
       <ol className="space-y-3">
        {[
         "Preencha o formulário de interesse",
         "Nossa equipe entra em contato",
         "Reunião para alinhar expectativas",
         "Definição do plano de parceria",
         "Início da colaboração!",
        ].map((step, index) => (
         <li key={index} className="flex items-start gap-3">
          <span className="bg-[#499D4B] text-white font-bold w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">
           {index + 1}
          </span>
          <span className="text-gray-700">{step}</span>
         </li>
        ))}
       </ol>
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
       <h3 className="font-bold text-gray-800 mb-3">Contato Direto</h3>
       <div className="space-y-3">
        <a
         href="tel:+5511999999999"
         className="flex items-center gap-3 text-gray-700 hover:text-[#499D4B] transition-colors"
        >
         <Phone size={18} />
         <span>(11) 99999-9999</span>
        </a>
        <a
         href="mailto:parcerias@terralsocial.org.br"
         className="flex items-center gap-3 text-gray-700 hover:text-[#499D4B] transition-colors"
        >
         <Mail size={18} />
         <span>parcerias@terralsocial.org.br</span>
        </a>
       </div>
      </div>
     </motion.div>

     {/* Formulário */}
     <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="lg:sticky lg:top-8 h-fit"
     >
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 overflow-hidden">
       <div className="bg-gradient-to-r from-[#499D4B] to-[#3d8540] p-6 text-white">
        <h2 className="text-2xl font-black mb-2">Manifeste seu Interesse</h2>
        <p className="text-sm opacity-90">
         Preencha o formulário e seja nosso parceiro
        </p>
       </div>

       <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div>
         <label className="block text-sm font-bold text-gray-700 mb-2">
          Nome da Empresa *
         </label>
         <input
          type="text"
          value={formData.companyName}
          onChange={(e) =>
           setFormData({ ...formData, companyName: e.target.value })
          }
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#499D4B] focus:outline-none"
          required
         />
        </div>

        <div>
         <label className="block text-sm font-bold text-gray-700 mb-2">
          Nome do Contato *
         </label>
         <input
          type="text"
          value={formData.contactName}
          onChange={(e) =>
           setFormData({ ...formData, contactName: e.target.value })
          }
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#499D4B] focus:outline-none"
          required
         />
        </div>

        <div>
         <label className="block text-sm font-bold text-gray-700 mb-2">
          E-mail *
         </label>
         <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#499D4B] focus:outline-none"
          required
         />
        </div>

        <div>
         <label className="block text-sm font-bold text-gray-700 mb-2">
          Telefone *
         </label>
         <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#499D4B] focus:outline-none"
          required
         />
        </div>

        <div>
         <label className="block text-sm font-bold text-gray-700 mb-2">
          Tipo de Parceria *
         </label>
         <select
          value={formData.partnershipType}
          onChange={(e) =>
           setFormData({
            ...formData,
            partnershipType: e.target.value,
           })
          }
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#499D4B] focus:outline-none"
          required
         >
          <option value="">Selecione uma opção</option>
          {partnershipTypes.map((type, index) => (
           <option key={index} value={type.title}>
            {type.title}
           </option>
          ))}
         </select>
        </div>

        <div>
         <label className="block text-sm font-bold text-gray-700 mb-2">
          Mensagem
         </label>
         <textarea
          value={formData.message}
          onChange={(e) =>
           setFormData({ ...formData, message: e.target.value })
          }
          rows={4}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#499D4B] focus:outline-none resize-none"
          placeholder="Conte-nos mais sobre sua empresa e interesse..."
         />
        </div>

        {submitError && (
         <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
          <p className="text-sm text-red-800">{submitError}</p>
         </div>
        )}

        {submitSuccess && (
         <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center"
         >
          <CheckCircle2 className="mx-auto text-green-500 mb-3" size={48} />
          <h3 className="text-xl font-black text-green-800 mb-2">
           Mensagem enviada com sucesso!
          </h3>
          <p className="text-sm text-green-700">
           Em breve entraremos em contato. Obrigado pelo interesse! 🤝
          </p>
         </motion.div>
        )}

        {!submitSuccess && (
         <button
          type="submit"
          disabled={isSubmitting || !isFormValid()}
          className="w-full bg-gradient-to-r from-[#499D4B] to-[#3d8540] text-white font-black py-4 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
         >
          {isSubmitting ? (
           <>
            <Loader2 className="animate-spin" size={20} />
            Enviando...
           </>
          ) : (
           <>
            <Handshake size={20} />
            Enviar Proposta
           </>
          )}
         </button>
        )}
       </form>
      </div>
     </motion.div>
    </div>

    {/* CTA Final */}
    <motion.div
     initial={{ opacity: 0, scale: 0.95 }}
     whileInView={{ opacity: 1, scale: 1 }}
     viewport={{ once: true }}
     className="bg-gradient-to-br from-[#499D4B] to-[#3d8540] rounded-3xl p-12 shadow-2xl text-center text-white"
    >
     <Handshake size={64} className="mx-auto mb-4" />
     <h2 className="text-3xl md:text-4xl font-black mb-4">
      Juntos Somos Mais Fortes
     </h2>
     <p className="text-lg mb-8 opacity-95 max-w-2xl mx-auto">
      Sua empresa pode ser protagonista na transformação de vidas. Vamos
      construir um futuro melhor juntos?
     </p>
     <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <a
       href="mailto:parcerias@terralsocial.org.br"
       className="bg-white text-[#499D4B] font-bold px-8 py-4 rounded-full hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
      >
       <Mail size={20} />
       Enviar E-mail
      </a>
      <a
       href="tel:+5511999999999"
       className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white/20 transition-all flex items-center justify-center gap-2"
      >
       <Phone size={20} />
       Ligar Agora
      </a>
     </div>
    </motion.div>
   </div>
  </div>
 );
}
