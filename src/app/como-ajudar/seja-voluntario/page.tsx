"use client";

import { motion } from "framer-motion";
import { getApiUrl } from "@/lib/api";
import { useState } from "react";
import {
 Users,
 Heart,
 Calendar,
 Mail,
 Phone,
 CheckCircle2,
 ArrowLeft,
 BookOpen,
 Palette,
 Code,
 Briefcase,
 GraduationCap,
 MessageCircle,
 UserPlus,
 Award,
 Loader2,
 AlertCircle,
} from "lucide-react";
import Link from "next/link";

const volunteerAreas = [
 {
  title: "Educação",
  icon: GraduationCap,
  description: "Ensine e transforme vidas através do conhecimento",
  opportunities: ["Reforço escolar", "Aulas de idiomas", "Alfabetização"],
  color: "#499D4B",
 },
 {
  title: "Artes e Cultura",
  icon: Palette,
  description: "Compartilhe sua arte e criatividade",
  opportunities: ["Oficinas de arte", "Teatro", "Música", "Dança"],
  color: "#3ca0e7",
 },
 {
  title: "Comunicação",
  icon: MessageCircle,
  description: "Ajude a divulgar nosso trabalho",
  opportunities: ["Redes sociais", "Design gráfico", "Fotografia", "Vídeo"],
  color: "#E74C3C",
 },
 {
  title: "Tecnologia",
  icon: Code,
  description: "Use suas habilidades técnicas pelo bem social",
  opportunities: ["Desenvolvimento web", "TI", "Manutenção de sistemas"],
  color: "#8B5CF6",
 },
 {
  title: "Administração",
  icon: Briefcase,
  description: "Organize e gerencie projetos",
  opportunities: ["Gestão de projetos", "Financeiro", "RH", "Jurídico"],
  color: "#F59E0B",
 },
 {
  title: "Eventos",
  icon: Calendar,
  description: "Ajude na organização de atividades",
  opportunities: ["Festas comunitárias", "Bazares", "Campanhas"],
  color: "#10B981",
 },
];

const benefits = [
 {
  icon: Heart,
  title: "Transforme Vidas",
  description: "Seu tempo faz diferença real na comunidade",
 },
 {
  icon: Users,
  title: "Novas Conexões",
  description: "Conheça pessoas incríveis e engajadas",
 },
 {
  icon: Award,
  title: "Desenvolva Habilidades",
  description: "Aprenda enquanto ensina e contribui",
 },
 {
  icon: BookOpen,
  title: "Experiência Prática",
  description: "Enriqueça seu currículo com experiência social",
 },
];

const requirements = [
 "Ser maior de 16 anos",
 "Ter disponibilidade mínima de 4 horas semanais",
 "Comprometimento com os valores da instituição",
 "Pontualidade e responsabilidade",
 "Paixão por ajudar o próximo",
];

const testimonials = [
 {
  name: "Julia Santos",
  role: "Voluntária há 2 anos",
  area: "Reforço Escolar",
  text:
   "Ser voluntária na Terral mudou minha vida. Ver o sorriso das crianças aprendendo não tem preço!",
  avatar: "J",
 },
 {
  name: "Pedro Oliveira",
  role: "Voluntário há 1 ano",
  area: "Comunicação",
  text:
   "Usar minhas habilidades de design para uma causa tão nobre é extremamente gratificante.",
  avatar: "P",
 },
 {
  name: "Carla Mendes",
  role: "Voluntária há 3 anos",
  area: "Oficinas de Arte",
  text:
   "Aqui encontrei propósito. Ensinar arte para essas crianças é transformador para todos nós.",
  avatar: "C",
 },
];

export default function SejaVoluntario() {
 const [selectedArea, setSelectedArea] = useState<number | null>(null);
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [submitSuccess, setSubmitSuccess] = useState(false);
 const [submitError, setSubmitError] = useState<string | null>(null);

 const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  area: "",
  availability: "",
  experience: "",
  message: "",
 });

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitError(null);

  try {
   // Enviar dados para a API
   const response = await fetch(getApiUrl("/api/volunteers"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
   });

   const data = await response.json();

   if (!response.ok) {
    // Tratar erros específicos
    if (response.status === 409) {
     setSubmitError(data.error || "Este e-mail já está cadastrado.");
    } else if (response.status === 400) {
     setSubmitError(
      data.message || "Por favor, verifique os dados informados."
     );
    } else {
     setSubmitError(
      data.message || "Erro ao enviar formulário. Tente novamente."
     );
    }
    return;
   }

   console.log("✅ Voluntário cadastrado:", data);

   setSubmitSuccess(true);
   setFormData({
    name: "",
    email: "",
    phone: "",
    area: "",
    availability: "",
    experience: "",
    message: "",
   });

   // Reset após 5 segundos
   setTimeout(() => {
    setSubmitSuccess(false);
   }, 5000);
  } catch (error) {
   setSubmitError(
    "Erro ao enviar formulário. Verifique sua conexão e tente novamente."
   );
   console.error("❌ Erro ao enviar formulário:", error);
  } finally {
   setIsSubmitting(false);
  }
 };

 const isFormValid = () => {
  return (
   formData.name &&
   formData.email &&
   formData.phone &&
   formData.area &&
   formData.availability
  );
 };

 return (
  <div className="min-h-screen bg-gradient-to-br from-[#FFFBF5] via-white to-green-50">
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
       <Heart size={48} fill="currentColor" />
       <h1 className="text-4xl md:text-5xl font-black">Seja Voluntário</h1>
      </div>
      <p className="text-lg md:text-xl opacity-95 max-w-3xl">
       Doe seu tempo, conhecimento e amor. Junte-se a nós e faça parte dessa
       transformação que já impactou mais de 15 mil vidas!
      </p>
     </motion.div>
    </div>
   </div>

   <div className="max-w-7xl mx-auto px-4 py-12">
    {/* Por que ser voluntário */}
    <motion.section
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ delay: 0.2 }}
     className="mb-16"
    >
     <h2 className="text-3xl md:text-4xl font-black text-center mb-4">
      Por que ser <span className="text-[#499D4B]">voluntário?</span>
     </h2>
     <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
      Voluntariar é uma via de mão dupla: você transforma vidas e também é
      transformado
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

    {/* Áreas de Atuação */}
    <motion.section
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     className="mb-16"
    >
     <h2 className="text-3xl md:text-4xl font-black text-center mb-4">
      Áreas de <span className="text-[#499D4B]">Atuação</span>
     </h2>
     <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
      Escolha a área que mais combina com você e suas habilidades
     </p>
     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {volunteerAreas.map((area, index) => {
       const Icon = area.icon;
       const isSelected = selectedArea === index;
       return (
        <motion.div
         key={index}
         initial={{ opacity: 0, scale: 0.9 }}
         whileInView={{ opacity: 1, scale: 1 }}
         viewport={{ once: true }}
         transition={{ delay: index * 0.1 }}
         onMouseEnter={() => setSelectedArea(index)}
         onMouseLeave={() => setSelectedArea(null)}
         onClick={() => setFormData({ ...formData, area: area.title })}
         className={`bg-white rounded-2xl p-6 shadow-lg border-2 cursor-pointer transition-all ${
          isSelected || formData.area === area.title
           ? "border-[#499D4B] scale-105"
           : "border-gray-100 hover:border-gray-300"
         }`}
        >
         <div
          className="w-16 h-16 rounded-xl flex items-center justify-center mb-4"
          style={{ backgroundColor: `${area.color}15` }}
         >
          <Icon size={32} style={{ color: area.color }} />
         </div>
         <h3 className="text-xl font-black mb-2" style={{ color: area.color }}>
          {area.title}
         </h3>
         <p className="text-sm text-gray-600 mb-4">{area.description}</p>
         <div className="space-y-1">
          {area.opportunities.map((opp, i) => (
           <div
            key={i}
            className="flex items-center gap-2 text-xs text-gray-500"
           >
            <CheckCircle2 size={14} className="text-green-500" />
            {opp}
           </div>
          ))}
         </div>
        </motion.div>
       );
      })}
     </div>
    </motion.section>

    {/* Formulário e Requisitos */}
    <div className="grid lg:grid-cols-2 gap-8 mb-16">
     {/* Requisitos */}
     <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="space-y-8"
     >
      <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
       <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
        <CheckCircle2 className="text-[#499D4B]" size={28} />
        Requisitos
       </h2>
       <ul className="space-y-4">
        {requirements.map((req, index) => (
         <motion.li
          key={index}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start gap-3"
         >
          <CheckCircle2
           className="text-[#499D4B] mt-1 flex-shrink-0"
           size={20}
          />
          <span className="text-gray-700">{req}</span>
         </motion.li>
        ))}
       </ul>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200">
       <h3 className="text-xl font-black mb-4 text-gray-800">Como funciona?</h3>
       <ol className="space-y-3">
        {[
         "Preencha o formulário ao lado",
         "Nossa equipe entrará em contato",
         "Participe de uma entrevista inicial",
         "Faça uma visita ao projeto",
         "Comece a transformar vidas!",
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
        <h2 className="text-2xl font-black mb-2">Inscreva-se Agora</h2>
        <p className="text-sm opacity-90">
         Preencha o formulário e junte-se a nós
        </p>
       </div>

       <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div>
         <label className="block text-sm font-bold text-gray-700 mb-2">
          Nome completo *
         </label>
         <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
          Área de interesse *
         </label>
         <select
          value={formData.area}
          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#499D4B] focus:outline-none"
          required
         >
          <option value="">Selecione uma área</option>
          {volunteerAreas.map((area, index) => (
           <option key={index} value={area.title}>
            {area.title}
           </option>
          ))}
         </select>
        </div>

        <div>
         <label className="block text-sm font-bold text-gray-700 mb-2">
          Disponibilidade *
         </label>
         <select
          value={formData.availability}
          onChange={(e) =>
           setFormData({
            ...formData,
            availability: e.target.value,
           })
          }
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#499D4B] focus:outline-none"
          required
         >
          <option value="">Selecione sua disponibilidade</option>
          <option value="4-8h">4-8 horas por semana</option>
          <option value="8-12h">8-12 horas por semana</option>
          <option value="12-20h">12-20 horas por semana</option>
          <option value="20+h">Mais de 20 horas por semana</option>
         </select>
        </div>

        <div>
         <label className="block text-sm font-bold text-gray-700 mb-2">
          Experiência prévia
         </label>
         <textarea
          value={formData.experience}
          onChange={(e) =>
           setFormData({ ...formData, experience: e.target.value })
          }
          rows={3}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#499D4B] focus:outline-none resize-none"
          placeholder="Conte-nos sobre sua experiência..."
         />
        </div>

        <div>
         <label className="block text-sm font-bold text-gray-700 mb-2">
          Por que quer ser voluntário?
         </label>
         <textarea
          value={formData.message}
          onChange={(e) =>
           setFormData({ ...formData, message: e.target.value })
          }
          rows={4}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#499D4B] focus:outline-none resize-none"
          placeholder="Compartilhe sua motivação..."
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
           Inscrição enviada com sucesso!
          </h3>
          <p className="text-sm text-green-700">
           Em breve entraremos em contato. Obrigado por querer fazer parte! ❤️
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
            <UserPlus size={20} />
            Enviar Inscrição
           </>
          )}
         </button>
        )}

        <p className="text-xs text-center text-gray-500">
         Ao enviar, você concorda em ser contatado pela Terral Social
        </p>
       </form>
      </div>
     </motion.div>
    </div>

    {/* Depoimentos */}
    <motion.section
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     className="mb-16"
    >
     <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
      Histórias de <span className="text-[#499D4B]">Voluntários</span>
     </h2>
     <div className="grid md:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
       <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100"
       >
        <div className="flex items-center gap-4 mb-4">
         <div className="w-12 h-12 bg-gradient-to-br from-[#499D4B] to-[#3d8540] rounded-full flex items-center justify-center text-white font-black text-xl">
          {testimonial.avatar}
         </div>
         <div>
          <p className="font-bold text-gray-800">{testimonial.name}</p>
          <p className="text-xs text-gray-500">{testimonial.role}</p>
         </div>
        </div>
        <div className="bg-green-50 rounded-lg px-3 py-1 inline-block mb-3">
         <p className="text-xs font-bold text-[#499D4B]">{testimonial.area}</p>
        </div>
        <p className="text-gray-700 italic">&ldquo;{testimonial.text}&rdquo;</p>
       </motion.div>
      ))}
     </div>
    </motion.section>

    {/* CTA Final */}
    <motion.div
     initial={{ opacity: 0, scale: 0.95 }}
     whileInView={{ opacity: 1, scale: 1 }}
     viewport={{ once: true }}
     className="bg-gradient-to-br from-[#499D4B] to-[#3d8540] rounded-3xl p-12 shadow-2xl text-center text-white"
    >
     <Heart size={64} className="mx-auto mb-4" fill="currentColor" />
     <h2 className="text-3xl md:text-4xl font-black mb-4">
      Pronto para Fazer a Diferença?
     </h2>
     <p className="text-lg mb-8 opacity-95 max-w-2xl mx-auto">
      Não espere mais! O tempo de transformar vidas é agora. Junte-se a centenas
      de voluntários que já fazem parte dessa história.
     </p>
     <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <a
       href="mailto:voluntarios@terralsocial.org.br"
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
