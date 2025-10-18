"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, Users, Theater } from "lucide-react";

const testimonials = [
 {
  name: "Caiene",
  role: "Ex aluna do curso de Teatro e agora mãe de aluno",
  testimonial:
   "O teatro é uma válvula de escape pra vida, dessa correria de trabalho, de casa. No teatro você pode ser quem você é, você se diverte... isso faz parte da nossa vida e agora quero que faça parte da vida dos meus filhos.",
  color: "#499D4B",
  icon: Sparkles,
  size: "large",
 },
 {
  name: "Rosângela",
  role: "Aluna do projeto Feliz Idade",
  testimonial:
   "Tem curso para senhoras idosas, que me faz muito bem graças a Deus. Tem uma santa professora chamada Janete, que me botou pra cima. Aqui encontrei amor e carinho tanto das crianças especiais quanto da Janete.",
  color: "#3ca0e7",
  icon: Heart,
  size: "medium",
 },
 {
  name: "Marta",
  role: "Mãe de Camila, aluna PCD do projeto Divertidamente",
  testimonial:
   "Me sinto bem aqui junto com a Janete e as meninas. Gosto de vir, até porque, nas atividades a gente não paga nada por isso, eu acho que isso compensa. É como se uma mão lavasse a outra, não custa nada a gente participar também, ajudar.",
  color: "#E74C3C",
  icon: Users,
  size: "medium",
 },
 {
  name: "Participante",
  role: "Participante do Teatro",
  testimonial:
   "Fazer teatro para mim é uma coisa que eu amo na minha vida. Envolve não só a arte do teatro, da cultura, mas para a vida, para o trabalho, para o dia a dia. O que me move é o amor de poder ensinar aquilo que eu aprendi com pessoas que foram solidárias comigo, essa semente que foi plantada, eu pegar e dividir com crianças que eu olho nos olhinhos delas assim e me vejo ali. E eu queria levar o que a gente conseguiu aqui, eu queria levar para outros lugares, para outras pessoas, outros grupos de adolescentes e graças a Deus, de certa forma, deu certo.",
  color: "#F59E0B",
  icon: Theater,
  size: "medium",
 },
];

const TestimonialsPage = () => {
 return (
  <div className="min-h-screen bg-[#FFFBF5] py-12 px-4 md:px-8 relative overflow-hidden">
   {/* SVG decorativo de fundo - Formas orgânicas */}
   <svg
    className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none"
    xmlns="http://www.w3.org/2000/svg"
   >
    <path
     d="M0,100 Q150,50 300,100 T600,100"
     fill="none"
     stroke="#499D4B"
     strokeWidth="3"
    />
    <circle cx="80%" cy="20%" r="120" fill="#3ca0e7" />
    <path
     d="M800,400 Q900,350 1000,400 T1200,400"
     fill="none"
     stroke="#E74C3C"
     strokeWidth="2"
    />
    <circle cx="15%" cy="70%" r="80" fill="#499D4B" />
   </svg>

   <div className="max-w-7xl mx-auto relative z-10">
    {/* Header orgânico */}
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     className="mb-12 text-center md:text-left"
    >
     <div className="inline-block mb-4">
      <svg
       width="60"
       height="60"
       viewBox="0 0 60 60"
       fill="none"
       xmlns="http://www.w3.org/2000/svg"
      >
       <path
        d="M30 5L35 20L50 22L38 32L42 47L30 40L18 47L22 32L10 22L25 20L30 5Z"
        fill="#499D4B"
        opacity="0.2"
       />
       <path
        d="M30 5L35 20L50 22L38 32L42 47L30 40L18 47L22 32L10 22L25 20L30 5Z"
        stroke="#499D4B"
        strokeWidth="2"
       />
      </svg>
     </div>
     <h1 className="text-5xl md:text-6xl font-black text-gray-800 mb-3 leading-tight">
      Vozes da nossa
      <br />
      <span className="text-[#499D4B]">comunidade</span>
     </h1>
     <p className="text-xl text-gray-600 mt-4 flex items-center gap-2">
      <Sparkles size={20} className="text-[#499D4B]" />
      Histórias reais de quem vive a Terral todo dia
     </p>
    </motion.div>

    {/* Mural assimétrico tipo Pinterest */}
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
     {/* Card 1 - Grande (esquerda) */}
     <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="md:col-span-7 bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
      style={{
       borderTop: `6px solid ${testimonials[0].color}`,
      }}
     >
      {/* SVG decorativo interno */}
      <svg
       className="absolute top-4 right-4 opacity-5"
       width="120"
       height="120"
       viewBox="0 0 120 120"
      >
       <path
        d="M20,60 Q60,20 100,60 T20,100"
        fill="none"
        stroke={testimonials[0].color}
        strokeWidth="4"
       />
       <circle cx="60" cy="30" r="15" fill={testimonials[0].color} />
       <circle cx="90" cy="80" r="10" fill={testimonials[0].color} />
      </svg>

      <div className="relative z-10">
       <div className="flex items-start gap-3 mb-4">
        <div
         className="w-12 h-12 rounded-2xl flex items-center justify-center"
         style={{ backgroundColor: `${testimonials[0].color}20` }}
        >
         {(() => {
          const Icon = testimonials[0].icon;
          return Icon ? <Icon size={24} color={testimonials[0].color} /> : null;
         })()}
        </div>
        <div>
         <h3 className="text-2xl font-bold text-gray-800">
          {testimonials[0].name}
         </h3>
         <p className="text-sm text-gray-500">{testimonials[0].role}</p>
        </div>
       </div>

       <p className="text-lg text-gray-700 leading-relaxed font-light italic">
        &ldquo;{testimonials[0].testimonial}&rdquo;
       </p>

       {/* Detalhe visual com SVG */}
       <div className="mt-6">
        <svg width="80" height="8" viewBox="0 0 80 8">
         <rect
          x="0"
          y="2"
          width="48"
          height="4"
          rx="2"
          fill={testimonials[0].color}
         />
         <rect x="56" y="2" width="24" height="4" rx="2" fill="#E5E7EB" />
        </svg>
       </div>
      </div>
     </motion.div>

     {/* Cards 2 e 3 - Menores (direita, empilhados) */}
     <div className="md:col-span-5 flex flex-col gap-4 md:gap-6">
      {testimonials.slice(1).map((item, idx) => {
       return (
        <motion.div
         key={item.name}
         initial={{ opacity: 0, x: 20 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ duration: 0.5, delay: 0.2 + idx * 0.15 }}
         whileHover={{ scale: 1.03 }}
         className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
         style={{
          borderLeft: `6px solid ${item.color}`,
         }}
        >
         {/* SVG decorativo interno diferente para cada card */}
         {idx === 0 ? (
          <svg
           className="absolute bottom-4 right-4 opacity-5"
           width="90"
           height="90"
           viewBox="0 0 90 90"
          >
           <path d="M10,45 L45,10 L80,45 L45,80 Z" fill={item.color} />
          </svg>
         ) : (
          <svg
           className="absolute bottom-4 right-4 opacity-5"
           width="90"
           height="90"
           viewBox="0 0 90 90"
          >
           <circle
            cx="45"
            cy="45"
            r="35"
            fill="none"
            stroke={item.color}
            strokeWidth="3"
           />
           <circle cx="45" cy="45" r="20" fill={item.color} />
          </svg>
         )}

         <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
           <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${item.color}20` }}
           >
            {(() => {
             const Icon = item.icon;
             return Icon ? <Icon size={20} color={item.color} /> : null;
            })()}
           </div>
           <div>
            <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
            <p className="text-xs text-gray-500">{item.role}</p>
           </div>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed font-light italic">
           &ldquo;{item.testimonial}&rdquo;
          </p>

          <div className="mt-4">
           <svg width="60" height="6" viewBox="0 0 60 6">
            <rect x="0" y="1" width="32" height="4" rx="2" fill={item.color} />
            <rect x="40" y="1" width="16" height="4" rx="2" fill="#E5E7EB" />
           </svg>
          </div>
         </div>
        </motion.div>
       );
      })}
     </div>
    </div>

    {/* CTA humanizado */}
    <motion.div
     initial={{ opacity: 0, y: 30 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.6, delay: 0.6 }}
     className="mt-12 bg-gradient-to-br from-[#499D4B] via-[#3d8540] to-[#499D4B] rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden hover:shadow-3xl transition-shadow"
    >
     {/* SVG pattern de fundo */}
     <svg
      className="absolute inset-0 w-full h-full opacity-10"
      xmlns="http://www.w3.org/2000/svg"
     >
      <defs>
       <pattern
        id="waves"
        x="0"
        y="0"
        width="100"
        height="100"
        patternUnits="userSpaceOnUse"
       >
        <path
         d="M0,50 Q25,30 50,50 T100,50"
         fill="none"
         stroke="white"
         strokeWidth="2"
        />
       </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#waves)" />
     </svg>

     {/* Ícones decorativos */}
     <div className="absolute top-6 right-8 text-white opacity-20">
      <Heart size={60} fill="currentColor" />
     </div>
     <div className="absolute bottom-8 left-12 text-white opacity-20">
      <Sparkles size={50} />
     </div>

     <div className="relative z-10 text-center">
      <div className="flex justify-center mb-4">
       <svg width="50" height="50" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="white" opacity="0.2" />
        <path
         d="M25 15 L30 20 L40 18 L32 26 L35 36 L25 31 L15 36 L18 26 L10 18 L20 20 Z"
         fill="white"
        />
       </svg>
      </div>
      <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
       Sua história pode ser a próxima
      </h2>
      <p className="text-white/95 text-lg mb-8 max-w-2xl mx-auto">
       Venha fazer parte dessa transformação. Cada pessoa importa, cada ação
       conta.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
       <button className="bg-white text-[#499D4B] font-bold px-8 py-4 rounded-full hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2">
        <Sparkles size={20} />
        Conhecer Projetos
       </button>
       <button className="bg-transparent border-3 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white/20 transition-all flex items-center justify-center gap-2">
        <Users size={20} />
        Ser Voluntário
       </button>
      </div>
     </div>
    </motion.div>
   </div>
  </div>
 );
};

export default TestimonialsPage;
