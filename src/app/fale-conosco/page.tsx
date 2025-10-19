"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
 Mail,
 Phone,
 MapPin,
 Send,
 User,
 MessageCircle,
 ArrowLeft,
 Loader2,
 CheckCircle2,
 AlertCircle,
 Clock,
} from "lucide-react";
import Link from "next/link";
import { contact } from "@/constants/contact";

export default function FaleConoscoPage() {
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [submitSuccess, setSubmitSuccess] = useState(false);
 const [submitError, setSubmitError] = useState<string | null>(null);

 const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  subject: "",
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
   console.log("Formulário de contato enviado:", formData);

   setSubmitSuccess(true);
   setFormData({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
   });

   setTimeout(() => {
    setSubmitSuccess(false);
   }, 5000);
  } catch (error) {
   setSubmitError("Erro ao enviar mensagem. Tente novamente.");
   console.error(error);
  } finally {
   setIsSubmitting(false);
  }
 };

 const isFormValid = () => {
  return (
   formData.name && formData.email && formData.subject && formData.message
  );
 };

 return (
  <div className="min-h-screen bg-gradient-to-br from-[#FFFBF5] via-white to-blue-50">
   {/* Header */}
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
       <MessageCircle size={48} />
       <h1 className="text-4xl md:text-5xl font-black">Fale Conosco</h1>
      </div>
      <p className="text-lg md:text-xl opacity-95 max-w-3xl">
       Estamos aqui para ouvir você. Entre em contato e tire suas dúvidas ou
       envie suas sugestões.
      </p>
     </motion.div>
    </div>
   </div>

   <div className="max-w-7xl mx-auto px-4 py-12">
    <div className="grid lg:grid-cols-2 gap-8">
     {/* Informações de Contato */}
     <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
     >
      <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
       <h2 className="text-2xl font-black text-gray-800 mb-6">
        Informações de Contato
       </h2>

       <div className="space-y-6">
        <div className="flex items-start gap-4">
         <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
          <MapPin size={24} className="text-[#499D4B]" />
         </div>
         <div>
          <h3 className="font-bold text-gray-800 mb-1">Endereço</h3>
          <p className="text-gray-600">
           R. Sen. Rui Carneiro, 601
           <br />
           Recreio dos Bandeirantes
           <br />
           Rio de Janeiro - RJ
          </p>
          <Link
           href="/quem-somos/nossa-sede"
           className="text-[#499D4B] text-sm font-bold hover:underline mt-2 inline-block"
          >
           Ver mapa →
          </Link>
         </div>
        </div>

        <div className="flex items-start gap-4">
         <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
          <Phone size={24} className="text-[#3ca0e7]" />
         </div>
         <div>
          <h3 className="font-bold text-gray-800 mb-1">Telefone</h3>
          <a
           href="tel:+5521999999999"
           className="text-gray-600 hover:text-[#499D4B] transition-colors"
          >
           {contact.phone}
          </a>
          <p className="text-sm text-gray-500 mt-1">
           Segunda a Sexta: 9h às 18h
          </p>
         </div>
        </div>

        <div className="flex items-start gap-4">
         <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
          <Mail size={24} className="text-[#E74C3C]" />
         </div>
         <div>
          <h3 className="font-bold text-gray-800 mb-1">E-mail</h3>
          <a
           href="mailto:terralsocial@gmail.com"
           className="text-gray-600 hover:text-[#499D4B] transition-colors"
          >
           terralsocial@gmail.com
          </a>
          <p className="text-sm text-gray-500 mt-1">
           Respondemos em até 24 horas
          </p>
         </div>
        </div>

        <div className="flex items-start gap-4">
         <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center flex-shrink-0">
          <Clock size={24} className="text-[#F59E0B]" />
         </div>
         <div>
          <h3 className="font-bold text-gray-800 mb-1">
           Horário de Atendimento
          </h3>
          <p className="text-gray-600">
           Segunda a Sexta: 9h às 18h
           <br />
           Sábado: 9h às 13h
           <br />
           <span className="text-sm text-gray-500">
            Domingos e feriados: Fechado
           </span>
          </p>
         </div>
        </div>
       </div>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 border-2 border-green-200">
       <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
        <MessageCircle size={20} className="text-[#499D4B]" />
        Outras Formas de Contato
       </h3>
       <p className="text-gray-700 text-sm leading-relaxed mb-4">
        Também estamos disponíveis nas redes sociais! Siga-nos para ficar por
        dentro de todas as novidades e eventos.
       </p>
       <div className="flex gap-3">
        <a
         href="https://instagram.com"
         target="_blank"
         rel="noopener noreferrer"
         className="w-10 h-10 rounded-full bg-[#E1306C] text-white flex items-center justify-center hover:scale-110 transition-transform"
         aria-label="Instagram"
        >
         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
         </svg>
        </a>
        <a
         href="https://facebook.com"
         target="_blank"
         rel="noopener noreferrer"
         className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform"
         aria-label="Facebook"
        >
         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
         </svg>
        </a>
        <a
         href="https://youtube.com"
         target="_blank"
         rel="noopener noreferrer"
         className="w-10 h-10 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:scale-110 transition-transform"
         aria-label="YouTube"
        >
         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
         </svg>
        </a>
       </div>
      </div>
     </motion.div>

     {/* Formulário */}
     <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="lg:sticky lg:top-8 h-fit"
     >
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 overflow-hidden">
       <div className="bg-gradient-to-r from-[#499D4B] to-[#3d8540] p-6 text-white">
        <h2 className="text-2xl font-black mb-2">Envie sua Mensagem</h2>
        <p className="text-sm opacity-90">
         Preencha o formulário e entraremos em contato em breve
        </p>
       </div>

       <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div>
         <label className="block text-sm font-bold text-gray-700 mb-2">
          Nome Completo *
         </label>
         <div className="relative">
          <User
           className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
           size={18}
          />
          <input
           type="text"
           value={formData.name}
           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
           className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#499D4B] focus:outline-none"
           placeholder="Seu nome"
           required
          />
         </div>
        </div>

        <div>
         <label className="block text-sm font-bold text-gray-700 mb-2">
          E-mail *
         </label>
         <div className="relative">
          <Mail
           className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
           size={18}
          />
          <input
           type="email"
           value={formData.email}
           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
           className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#499D4B] focus:outline-none"
           placeholder="seu@email.com"
           required
          />
         </div>
        </div>

        <div>
         <label className="block text-sm font-bold text-gray-700 mb-2">
          Telefone
         </label>
         <div className="relative">
          <Phone
           className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
           size={18}
          />
          <input
           type="tel"
           value={formData.phone}
           onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
           className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#499D4B] focus:outline-none"
           placeholder="(00) 00000-0000"
          />
         </div>
        </div>

        <div>
         <label className="block text-sm font-bold text-gray-700 mb-2">
          Assunto *
         </label>
         <input
          type="text"
          value={formData.subject}
          onChange={(e) =>
           setFormData({ ...formData, subject: e.target.value })
          }
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#499D4B] focus:outline-none"
          placeholder="Sobre o que você quer falar?"
          required
         />
        </div>

        <div>
         <label className="block text-sm font-bold text-gray-700 mb-2">
          Mensagem *
         </label>
         <textarea
          value={formData.message}
          onChange={(e) =>
           setFormData({ ...formData, message: e.target.value })
          }
          rows={6}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#499D4B] focus:outline-none resize-none"
          placeholder="Escreva sua mensagem aqui..."
          required
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
           Em breve entraremos em contato. Obrigado! 🌱
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
            <Send size={20} />
            Enviar Mensagem
           </>
          )}
         </button>
        )}
       </form>
      </div>
     </motion.div>
    </div>
   </div>
  </div>
 );
}
