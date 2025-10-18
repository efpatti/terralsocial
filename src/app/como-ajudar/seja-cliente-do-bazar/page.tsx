"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
 ShoppingBag,
 Clock,
 MapPin,
 Phone,
 Mail,
 Heart,
 Users,
 Recycle,
 DollarSign,
 ArrowLeft,
 ChevronRight,
 Shirt,
 Sparkles,
} from "lucide-react";
import Link from "next/link";

const products = [
 {
  category: "Roupas",
  icon: Shirt,
  items: ["Camisetas", "Calças", "Vestidos", "Blusas", "Shorts"],
  color: "#3ca0e7",
 },
 {
  category: "Acessórios",
  icon: Sparkles,
  items: ["Bolsas", "Cintos", "Chapéus", "Bijuterias", "Lenços"],
  color: "#E74C3C",
 },
 {
  category: "Calçados",
  icon: ShoppingBag,
  items: ["Tênis", "Sandálias", "Sapatos", "Chinelos", "Botas"],
  color: "#8B5CF6",
 },
 {
  category: "Artesanato",
  icon: Heart,
  items: ["Decoração", "Quadros", "Vasos", "Peças únicas", "Presentes"],
  color: "#499D4B",
 },
];

const benefits = [
 {
  icon: DollarSign,
  title: "Preços Acessíveis",
  description: "Produtos de qualidade por valores que cabem no seu bolso",
  color: "#499D4B",
 },
 {
  icon: Heart,
  title: "Apoio Social",
  description: "Sua compra mantém nossos projetos sociais funcionando",
  color: "#E74C3C",
 },
 {
  icon: Recycle,
  title: "Sustentabilidade",
  description: "Economia circular e redução do desperdício",
  color: "#3ca0e7",
 },
 {
  icon: Users,
  title: "Impacto Comunitário",
  description: "Ajuda centenas de famílias do Terreirão",
  color: "#F59E0B",
 },
];

export default function SejaClienteDoBazar() {
 const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

 return (
  <div className="min-h-screen bg-gradient-to-br from-[#FFFBF5] via-white to-blue-50">
   {/* Header */}
   <div className="bg-gradient-to-r from-[#3ca0e7] to-[#2a7bb8] text-white py-8 px-4">
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
       <ShoppingBag size={48} />
       <h1 className="text-4xl md:text-5xl font-black">Bazar Terral</h1>
      </div>
      <p className="text-lg md:text-xl opacity-95 max-w-3xl mb-4">
       Nós acreditamos que roupas são ferramentas de empoderamento e
       transformação. Aqui na Terral todos podem se vestir bem, fazendo o bem!
      </p>
      <p className="text-base md:text-lg opacity-90 max-w-3xl">
       Temos peças a partir de <strong>1 real</strong>, valor simbólico que nos
       possibilita continuar realizando nossos projetos e desenvolvendo nossa
       comunidade.
      </p>
     </motion.div>
    </div>
   </div>

   <div className="max-w-7xl mx-auto px-4 py-12">
    {/* Nossa Missão */}
    <motion.section
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ delay: 0.2 }}
     className="mb-16"
    >
     <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 md:p-12 shadow-lg border-2 border-blue-100">
      <div className="text-center max-w-3xl mx-auto">
       <Heart
        className="mx-auto mb-6 text-[#3ca0e7]"
        size={56}
        fill="#3ca0e7"
       />
       <h2 className="text-3xl md:text-4xl font-black mb-6 text-gray-800">
        Vista-se Bem, <span className="text-[#3ca0e7]">Faça o Bem!</span>
       </h2>
       <p className="text-lg text-gray-700 mb-4">
        Nós acreditamos que roupas são ferramentas de{" "}
        <strong>empoderamento e transformação</strong>. Aqui na Terral, todos
        podem se vestir bem, fazendo o bem!
       </p>
       <div className="bg-white rounded-2xl p-6 mt-6 border-2 border-[#3ca0e7]">
        <p className="text-2xl md:text-3xl font-black text-[#3ca0e7] mb-2">
         Peças a partir de R$ 1,00
        </p>
        <p className="text-gray-600">
         Valor simbólico que nos possibilita continuar realizando nossos
         projetos e desenvolvendo nossa comunidade.
        </p>
       </div>
      </div>
     </div>
    </motion.section>

    {/* Como Funciona */}
    <motion.section
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ delay: 0.2 }}
     className="mb-16"
    >
     <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
      Como <span className="text-[#3ca0e7]">Funciona</span>
     </h2>
     <div className="grid md:grid-cols-3 gap-8">
      {[
       {
        step: "1",
        title: "Visite o Bazar",
        description:
         "Venha conhecer nosso espaço e explorar os produtos disponíveis",
        icon: MapPin,
       },
       {
        step: "2",
        title: "Escolha seus Produtos",
        description:
         "Roupas, calçados, acessórios e artesanato com preços acessíveis",
        icon: ShoppingBag,
       },
       {
        step: "3",
        title: "Faça a Diferença",
        description: "Sua compra apoia diretamente nossos projetos sociais",
        icon: Heart,
       },
      ].map((item, index) => {
       const Icon = item.icon;
       return (
        <motion.div
         key={index}
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ delay: index * 0.1 }}
         className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 text-center"
        >
         <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon size={32} className="text-[#3ca0e7]" />
         </div>
         <div className="text-5xl font-black text-[#3ca0e7] mb-2">
          {item.step}
         </div>
         <h3 className="text-xl font-bold mb-3">{item.title}</h3>
         <p className="text-gray-600">{item.description}</p>
        </motion.div>
       );
      })}
     </div>
    </motion.section>

    {/* Produtos Disponíveis */}
    <motion.section
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     className="mb-16"
    >
     <h2 className="text-3xl md:text-4xl font-black text-center mb-4">
      O que você <span className="text-[#3ca0e7]">encontra</span>
     </h2>
     <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
      Nosso bazar oferece uma grande variedade de produtos doados e artesanato
      produzido pelos alunos das oficinas
     </p>
     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product, index) => {
       const Icon = product.icon;
       const isSelected = selectedCategory === index;
       return (
        <motion.div
         key={index}
         initial={{ opacity: 0, scale: 0.9 }}
         whileInView={{ opacity: 1, scale: 1 }}
         viewport={{ once: true }}
         transition={{ delay: index * 0.1 }}
         onMouseEnter={() => setSelectedCategory(index)}
         onMouseLeave={() => setSelectedCategory(null)}
         className={`bg-white rounded-2xl p-6 shadow-lg border-2 cursor-pointer transition-all ${
          isSelected
           ? "border-[#3ca0e7] scale-105"
           : "border-gray-100 hover:border-gray-300"
         }`}
        >
         <div
          className="w-16 h-16 rounded-xl flex items-center justify-center mb-4"
          style={{ backgroundColor: `${product.color}15` }}
         >
          <Icon size={32} style={{ color: product.color }} />
         </div>
         <h3
          className="text-xl font-black mb-4"
          style={{ color: product.color }}
         >
          {product.category}
         </h3>
         <ul className="space-y-2">
          {product.items.map((item, i) => (
           <li
            key={i}
            className="flex items-center gap-2 text-sm text-gray-600"
           >
            <ChevronRight size={16} className="text-gray-400" />
            {item}
           </li>
          ))}
         </ul>
        </motion.div>
       );
      })}
     </div>
    </motion.section>

    {/* Benefícios */}
    <motion.section
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     className="mb-16"
    >
     <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
      Por que comprar <span className="text-[#3ca0e7]">conosco?</span>
     </h2>
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
         <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: `${benefit.color}15` }}
         >
          <Icon size={28} style={{ color: benefit.color }} />
         </div>
         <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
         <p className="text-sm text-gray-600">{benefit.description}</p>
        </motion.div>
       );
      })}
     </div>
    </motion.section>

    {/* Localização e Horários */}
    <div className="grid lg:grid-cols-2 gap-8 mb-16">
     {/* Informações */}
     <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100"
     >
      <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
       <MapPin className="text-[#3ca0e7]" size={28} />
       Localização e Horários
      </h2>
      <div className="space-y-6">
       <div>
        <div className="flex items-start gap-3 mb-4">
         <MapPin className="text-gray-400 mt-1 flex-shrink-0" size={20} />
         <div>
          <h3 className="font-bold mb-1">Endereço</h3>
          <p className="text-gray-600">
           R. Sen. Rui Carneiro, 601
           <br />
           Recreio dos Bandeirantes
           <br />
           Rio de Janeiro - RJ
          </p>
         </div>
        </div>
       </div>

       <div>
        <div className="flex items-start gap-3 mb-4">
         <Clock className="text-gray-400 mt-1 flex-shrink-0" size={20} />
         <div>
          <h3 className="font-bold mb-2">Horário de Funcionamento</h3>
          <div className="space-y-1 text-gray-600">
           <p>Segunda a Sexta: 9h às 17h</p>
           <p>Sábado: 9h às 13h</p>
           <p className="text-sm text-gray-500 mt-2">
            Domingos e feriados: Fechado
           </p>
          </div>
         </div>
        </div>
       </div>

       <div className="border-t-2 border-gray-100 pt-6">
        <h3 className="font-bold mb-3">Entre em Contato</h3>
        <div className="space-y-3">
         <a
          href="tel:+5511999999999"
          className="flex items-center gap-3 text-gray-600 hover:text-[#3ca0e7] transition-colors"
         >
          <Phone size={18} />
          <span>(11) 99999-9999</span>
         </a>
         <a
          href="mailto:bazar@terralsocial.org.br"
          className="flex items-center gap-3 text-gray-600 hover:text-[#3ca0e7] transition-colors"
         >
          <Mail size={18} />
          <span>bazar@terralsocial.org.br</span>
         </a>
        </div>
       </div>
      </div>
     </motion.div>

     {/* Google Maps Street View */}
     <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="lg:sticky lg:top-8 h-fit"
     >
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 overflow-hidden">
       <div className="bg-gradient-to-r from-[#3ca0e7] to-[#2a7bb8] p-4 text-white">
        <h2 className="text-xl font-black flex items-center gap-2">
         <MapPin size={24} />
         Visualização da Rua
        </h2>
       </div>
       <div className="relative w-full" style={{ paddingBottom: "75%" }}>
        <iframe
         src="https://www.google.com/maps/embed?pb=!4v1729267891234!6m8!1m7!1sCAoSLEFGMVFpcE9xTHhXNXJ6aWRVLWdKX3ZzaWtoUXBYQ3VXS05oZkNNcVN6a0Ez!2m2!1d-23.0177!2d-43.4639!3f0!4f0!5f0.7820865974627469"
         className="absolute top-0 left-0 w-full h-full"
         style={{ border: 0 }}
         allowFullScreen
         loading="lazy"
         referrerPolicy="no-referrer-when-downgrade"
         title="Google Street View - Bazar Terral"
        />
       </div>
       <div className="p-4 bg-gray-50">
        <a
         href="https://www.google.com/maps/place/R.+Sen.+Rui+Carneiro,+601+-+Recreio+dos+Bandeirantes,+Rio+de+Janeiro+-+RJ/@-23.0177,-43.4639,17z"
         target="_blank"
         rel="noopener noreferrer"
         className="text-[#3ca0e7] font-bold hover:underline flex items-center gap-2 justify-center"
        >
         <MapPin size={18} />
         Abrir no Google Maps
        </a>
       </div>
      </div>
     </motion.div>
    </div>

    {/* CTA Final */}
    <motion.div
     initial={{ opacity: 0, scale: 0.95 }}
     whileInView={{ opacity: 1, scale: 1 }}
     viewport={{ once: true }}
     className="bg-gradient-to-br from-[#3ca0e7] to-[#2a7bb8] rounded-3xl p-12 shadow-2xl relative overflow-hidden text-center"
    >
     <div className="relative z-10 text-white">
      <ShoppingBag size={64} className="mx-auto mb-4" />
      <h2 className="text-3xl md:text-4xl font-black mb-4">
       Venha Conhecer Nosso Bazar!
      </h2>
      <p className="text-lg mb-8 opacity-95 max-w-2xl mx-auto">
       Encontre produtos incríveis, apoie a comunidade e faça parte dessa
       transformação social.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
       <a
        href="https://maps.google.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white text-[#3ca0e7] font-bold px-8 py-4 rounded-full hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
       >
        <MapPin size={20} />
        Como Chegar
       </a>
       <a
        href="tel:+5511999999999"
        className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white/20 transition-all flex items-center justify-center gap-2"
       >
        <Phone size={20} />
        Ligar Agora
       </a>
      </div>
     </div>
    </motion.div>
   </div>
  </div>
 );
}
