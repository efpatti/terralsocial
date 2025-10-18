"use client";

import { motion } from "framer-motion";
import {
 Users,
 Heart,
 Target,
 TrendingUp,
 Award,
 Sparkles,
 Theater,
 Handshake,
 GraduationCap,
 Star,
 Calendar,
 Play,
} from "lucide-react";

const palette = {
 "--c-green": "#499D4B",
 "--c-blue": "#3ca0e7",
 "--c-red": "#E74C3C",
 "--c-yellow": "#F59E0B",
} as React.CSSProperties;

const timelineEvents = [
 {
  year: "1992",
  title: "O Início: Arte que Transforma",
  description:
   "Começamos atividades artístico-pedagógicas na Comunidade do Terreirão. Era uma grande brincadeira - uma forma de matar o tempo, de nos divertir com os amigos. Ensaiávamos no quintal da Janete ou na casa de alguém.",
  icon: Sparkles,
  color: "#499D4B",
 },
 {
  year: "1995",
  title: "Nasce o Fazendo Acontecendo",
  description:
   "O grupo de teatro nasce como alegria entre vizinhos. Quando começamos, era diversão pura - as pessoas se divertindo, brincando, fazendo coisas que criança gosta de fazer. Mas aos poucos fomos vendo que tinha uma outra história por trás.",
  icon: Theater,
  color: "#3ca0e7",
 },
 {
  year: "1998",
  title: "Primeira Paixão de Cristo",
  description:
   "Sem recursos, catamos madeira nas obras do Recreio para fazer o tablado. Éramos muito jovens e só sabíamos estar no palco - não sabíamos de produção nem administração. Mas fizemos acontecer com o que tínhamos.",
  icon: Award,
  color: "#8B5CF6",
 },
 {
  year: "2000",
  title: "Parceria com a Cresce Amor",
  description:
   "Conseguimos um espaço enorme na Cresce Amor através da Nena Ribeiro, que sempre apoiou e nunca disse não. Chegavam doações de figurinos e fantasias. Foi uma das que mais acreditou na gente.",
  icon: Handshake,
  color: "#F59E0B",
 },
 {
  year: "Anos 2000",
  title: "Crescimento e Desafios",
  description:
   "O Terreirão entrou no mapa cultural do Rio. Saíamos para nos apresentar e víamos crianças sem as oportunidades que tínhamos. Mas chegou a hora de escolher: botar comida no prato ou continuar a brincadeira. Cada um foi buscando seu rumo.",
  icon: TrendingUp,
  color: "#E74C3C",
 },
 {
  year: "2005-presente",
  title: "Escola de Atores e Família",
  description:
   "O Fazendo Acontecendo se tornou uma escola e uma família. Quem fez parte trilha um caminho do bem, de ação social. Aprendemos que teatro não é só brincar - ele ensina a trabalhar no coletivo, dá voz a quem ninguém quer escutar.",
  icon: GraduationCap,
  color: "#499D4B",
 },
 {
  year: "2024",
  title: "32 Anos de Transformação",
  description:
   "Seguimos firmes no propósito: criar oportunidades, fortalecer a comunidade e mostrar que o morador da favela pode chegar lá fora e ter voz. O teatro alimenta a alma e abre portas. É uma válvula de escape, é psicólogo, é tudo.",
  icon: Star,
  color: "#3ca0e7",
 },
];

function TimelineItem({
 event,
 index,
 isLast,
}: {
 event: (typeof timelineEvents)[number];
 index: number;
 isLast: boolean;
}) {
 const Icon = event.icon;
 const isEven = index % 2 === 0;

 return (
  <motion.div
   initial={{ opacity: 0, x: isEven ? -50 : 50 }}
   whileInView={{ opacity: 1, x: 0 }}
   viewport={{ once: true, margin: "-100px" }}
   transition={{ duration: 0.8, delay: index * 0.15 }}
   className={`flex items-center gap-8 ${
    isEven ? "md:flex-row" : "md:flex-row-reverse"
   }`}
  >
   {/* Conteúdo */}
   <div className="flex-1">
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 group">
     {/* Ano e Ícone no topo */}
     <div className="flex items-center gap-3 mb-4">
      <div
       className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
       style={{ backgroundColor: `${event.color}15` }}
      >
       <Icon className="w-6 h-6" style={{ color: event.color }} />
      </div>
      <div className="flex items-center gap-2">
       <Calendar className="w-5 h-5" style={{ color: event.color }} />
       <span className="text-2xl font-black" style={{ color: event.color }}>
        {event.year}
       </span>
      </div>
     </div>

     {/* Título */}
     <h3 className="text-xl font-bold text-gray-800 mb-3">{event.title}</h3>

     {/* Descrição */}
     <p className="text-gray-600 leading-relaxed">{event.description}</p>

     {/* Barra decorativa */}
     <div
      className="mt-4 h-1 w-12 rounded-full transition-all group-hover:w-full"
      style={{ backgroundColor: event.color }}
     />
    </div>
   </div>

   {/* Linha do tempo central */}
   <div className="flex flex-col items-center flex-shrink-0">
    <div
     className="w-4 h-4 rounded-full border-4 border-white shadow-lg z-10"
     style={{ backgroundColor: event.color }}
    />
    {!isLast && (
     <div
      className="w-1 h-32 mt-2"
      style={{
       background: `linear-gradient(to bottom, ${event.color}, ${
        timelineEvents[index + 1].color
       })`,
      }}
     />
    )}
   </div>

   {/* Espaço vazio do outro lado (para desktop) */}
   <div className="flex-1 hidden md:block" />
  </motion.div>
 );
}

function DetailedTimeline({ anchorId }: { anchorId: string }) {
 return (
  <section id={anchorId} className="py-20 bg-white">
   <div className="max-w-6xl mx-auto px-4">
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     className="text-center mb-16"
    >
     <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
      Nossa <span style={{ color: "var(--c-green)" }}>Jornada</span>
     </h2>
     <p className="text-lg text-gray-600 max-w-2xl mx-auto">
      32 anos construindo cultura e transformando vidas no Terreirão - com
      alegrias, desafios e muita união
     </p>
    </motion.div>

    <div className="relative">
     {timelineEvents.map((ev, i) => (
      <TimelineItem
       key={ev.year}
       event={ev}
       index={i}
       isLast={i === timelineEvents.length - 1}
      />
     ))}
    </div>
   </div>
  </section>
 );
}

function CommunityImpact() {
 const impacts = [
  {
   icon: GraduationCap,
   title: "Escola de Atores e Vida",
   description:
    "Fazemos formação e conectamos a comunidade a oportunidades reais. O teatro ensina comunicação, trabalho em equipe e abre portas para bons empregos.",
   color: "#499D4B",
  },
  {
   icon: Heart,
   title: "Transformação Pessoal",
   description:
    "O teatro tem sido válvula de escape e psicólogo para muitos. Ele alimenta a alma e resgata a autoestima através das artes e oficinas.",
   color: "#E74C3C",
  },
  {
   icon: Target,
   title: "Voz para Quem Ninguém Escuta",
   description:
    "Mostramos que o morador da comunidade pode chegar lá fora e ter voz. Contamos nossas histórias e quebramos estereótipos - não somos pobres coitados.",
   color: "#3ca0e7",
  },
  {
   icon: Users,
   title: "Trabalho no Coletivo",
   description:
    "Não pensamos 'quero para mim', mas 'quero para todos'. O sol que brilha para um, vai brilhar para todos que estão ali naquele momento.",
   color: "#F59E0B",
  },
 ];

 return (
  <section className="py-20 bg-[#FFFBF5]">
   <div className="max-w-7xl mx-auto px-4">
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     className="text-center mb-12"
    >
     <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
      Impacto na <span style={{ color: "var(--c-green)" }}>Comunidade</span>
     </h2>
     <p className="text-lg text-gray-600 max-w-2xl mx-auto">
      A cultura é um instrumento socializador - é a magia do teatro de cativar
      qualquer ser humano
     </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
     {impacts.map((impact, i) => {
      const Icon = impact.icon;
      return (
       <motion.div
        key={i}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.1 }}
        className="relative group"
       >
        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-gray-200">
         <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
          style={{ backgroundColor: `${impact.color}15` }}
         >
          <Icon className="w-7 h-7" style={{ color: impact.color }} />
         </div>
         <h3 className="text-xl font-bold text-gray-800 mb-3">
          {impact.title}
         </h3>
         <p className="text-gray-600 leading-relaxed">{impact.description}</p>
         <div
          className="mt-4 h-1 w-12 rounded-full transition-all group-hover:w-full"
          style={{ backgroundColor: impact.color }}
         />
        </div>
       </motion.div>
      );
     })}
    </div>
   </div>
  </section>
 );
}

export default function NossaHistoria() {
 const timelineId = "nossa-jornada-detalhes";

 const scrollToTimeline = () => {
  const el = document.getElementById(timelineId);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
 };

 return (
  <div style={palette} className="min-h-screen bg-[#FFFBF5]">
   {/* Hero Section */}
   <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden bg-[#499D4B]">
    <svg
     className="absolute inset-0 w-full h-full opacity-5"
     xmlns="http://www.w3.org/2000/svg"
    >
     <defs>
      <pattern
       id="hero-pattern"
       x="0"
       y="0"
       width="80"
       height="80"
       patternUnits="userSpaceOnUse"
      >
       <circle cx="40" cy="40" r="2" fill="white" />
      </pattern>
     </defs>
     <rect width="100%" height="100%" fill="url(#hero-pattern)" />
    </svg>

    <div className="container mx-auto px-6 text-center relative z-10">
     <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight"
     >
      Uma História de Arte e Transformação
     </motion.h1>

     <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="text-lg md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto font-light leading-relaxed"
     >
      32 anos de trabalho coletivo no Terreirão, construindo cultura e cuidado
     </motion.p>

     <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 180 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={scrollToTimeline}
      className="px-8 py-4 bg-white text-[#499D4B] rounded-full font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
     >
      <Play size={20} />
      Conhecer nossa história
     </motion.button>
    </div>

    <motion.div
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     transition={{ delay: 1.2 }}
     className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
    >
     <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
     >
      <motion.div
       animate={{ y: [0, 12, 0] }}
       transition={{ duration: 2, repeat: Infinity }}
       className="w-1 h-3 bg-white rounded-full mt-2"
      />
     </motion.div>
    </motion.div>
   </section>

   <DetailedTimeline anchorId={timelineId} />
   <CommunityImpact />

   {/* CTA Final */}
   <section className="py-16 px-4 bg-white">
    <div className="max-w-5xl mx-auto">
     <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-[#499D4B] to-[#3d8540] rounded-3xl p-12 shadow-2xl relative overflow-hidden"
     >
      <svg
       className="absolute top-0 right-0 w-64 h-64 opacity-10"
       viewBox="0 0 200 200"
      >
       <circle cx="100" cy="100" r="80" fill="white" />
       <path
        d="M100 40 L120 80 L160 90 L130 120 L140 160 L100 140 L60 160 L70 120 L40 90 L80 80 Z"
        fill="white"
       />
      </svg>

      <div className="relative z-10 text-center text-white">
       <h2 className="text-3xl md:text-4xl font-black mb-4">
        Quer conhecer mais?
       </h2>
       <p className="text-lg mb-8 opacity-95 max-w-2xl mx-auto">
        Apoie, participe ou venha nos visitar - construímos juntos uma cidade
        mais humana
       </p>
       <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
         href="mailto:terral.social@gmail.com"
         className="bg-white text-[#499D4B] font-bold px-8 py-4 rounded-full hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
         Contato
        </a>
        <a
         href="https://www.instagram.com/terralsocial"
         target="_blank"
         rel="noreferrer"
         className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white/20 transition-all flex items-center justify-center gap-2"
        >
         Instagram
        </a>
       </div>
      </div>
     </motion.div>
    </div>
   </section>
  </div>
 );
}
