"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
 ArrowRight,
 ArrowLeft,
 Heart,
 Users,
 Calendar,
 Gift,
 TrendingUp,
} from "lucide-react";

// Hook para animar contadores
function useCounter(target: number, duration: number = 2) {
 const [count, setCount] = useState(0);
 const nodeRef = useRef<HTMLDivElement>(null);
 const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

 useEffect(() => {
  if (!isInView) return;

  let startTime: number | null = null;
  const startValue = 0;

  const animate = (currentTime: number) => {
   if (startTime === null) startTime = currentTime;
   const elapsed = currentTime - startTime;
   const progress = Math.min(elapsed / (duration * 1000), 1);

   // Easing function (easeOutExpo)
   const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
   const currentCount = Math.floor(
    startValue + (target - startValue) * easeProgress
   );

   setCount(currentCount);

   if (progress < 1) {
    requestAnimationFrame(animate);
   }
  };

  requestAnimationFrame(animate);
 }, [isInView, target, duration]);

 return { count, ref: nodeRef };
}

// Componente de Estatística REFATORADO
interface StatProps {
 value: number;
 suffix?: string;
 label: string;
 icon: React.ElementType;
 color: string;
 delay: number;
}

const StatCard = ({
 value,
 suffix = "",
 label,
 icon: Icon,
 color,
 delay,
}: StatProps) => {
 const { count, ref } = useCounter(value, 2.5);

 return (
  <motion.div
   ref={ref}
   initial={{ opacity: 0, y: 30 }}
   whileInView={{ opacity: 1, y: 0 }}
   viewport={{ once: true }}
   transition={{ duration: 0.6, delay }}
   className="relative group"
  >
   <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-gray-200">
    {/* Ícone com cor */}
    <div
     className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
     style={{ backgroundColor: `${color}15` }}
    >
     <Icon size={28} style={{ color }} />
    </div>

    {/* Número animado */}
    <div className="flex items-baseline gap-1 mb-2">
     <span className="text-4xl font-black tracking-tight" style={{ color }}>
      {count.toLocaleString("pt-BR")}
     </span>
     {suffix && (
      <span className="text-2xl font-bold text-gray-400">{suffix}</span>
     )}
    </div>

    {/* Label */}
    <p className="text-sm text-gray-600 leading-snug font-medium">{label}</p>

    {/* Barra decorativa */}
    <div
     className="mt-4 h-1 w-12 rounded-full transition-all group-hover:w-full"
     style={{ backgroundColor: color }}
    />
   </div>
  </motion.div>
 );
};

// Dados mockados
const stats = [
 {
  value: 15000,
  suffix: "+",
  label: "Pessoas atendidas até hoje",
  icon: Users,
  color: "#499D4B",
 },
 {
  value: 200,
  suffix: "+",
  label: "Pessoas nas oficinas atualmente",
  icon: Heart,
  color: "#3ca0e7",
 },
 {
  value: 3000,
  suffix: "+",
  label: "Participaram de eventos e palestras",
  icon: TrendingUp,
  color: "#E74C3C",
 },
 { value: 30, label: "Atendidas no Grupo AA", icon: Users, color: "#F59E0B" },
 {
  value: 600,
  label: "Brinquedos doados no Dia das Crianças",
  icon: Gift,
  color: "#8B5CF6",
 },
];

const slides = [
 {
  title: "Transformando vidas através da arte",
  description: "32 anos promovendo educação, cultura e inclusão no Terreirão",
  bgColor: "bg-gradient-to-br from-green-600 to-green-700",
  textColor: "text-white",
 },
 {
  title: "Educação que liberta",
  description: "Teatro, capoeira, artes e muito mais para todas as idades",
  bgColor: "bg-gradient-to-br from-blue-600 to-blue-700",
  textColor: "text-white",
 },
 {
  title: "Inclusão é nosso propósito",
  description: "Projetos para PCD, idosos e toda a comunidade",
  bgColor: "bg-gradient-to-br from-red-600 to-red-700",
  textColor: "text-white",
 },
];

export default function Home() {
 const [currentSlide, setCurrentSlide] = useState(0);

 const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
 const prevSlide = () =>
  setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

 return (
  <div className="min-h-screen bg-[#FFFBF5]">
   {/* Hero Slider */}
   <section className="relative h-[500px] md:h-[600px] overflow-hidden">
    {slides.map((slide, index) => (
     <motion.div
      key={index}
      initial={{ opacity: 0 }}
      animate={{
       opacity: index === currentSlide ? 1 : 0,
       zIndex: index === currentSlide ? 1 : 0,
      }}
      transition={{ duration: 0.7 }}
      className={`absolute inset-0 flex items-center justify-center ${slide.bgColor} ${slide.textColor}`}
     >
      {/* Pattern de fundo */}
      <svg
       className="absolute inset-0 w-full h-full opacity-10"
       xmlns="http://www.w3.org/2000/svg"
      >
       <defs>
        <pattern
         id={`pattern-${index}`}
         x="0"
         y="0"
         width="80"
         height="80"
         patternUnits="userSpaceOnUse"
        >
         <circle cx="40" cy="40" r="2" fill="white" />
        </pattern>
       </defs>
       <rect width="100%" height="100%" fill={`url(#pattern-${index})`} />
      </svg>

      <div className="container mx-auto px-6 text-center relative z-10">
       <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-4xl md:text-6xl font-black mb-4 leading-tight"
       >
        {slide.title}
       </motion.h1>
       <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto font-light"
       >
        {slide.description}
       </motion.p>
       <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 bg-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
        style={{
         color: index === 0 ? "#499D4B" : index === 1 ? "#3ca0e7" : "#E74C3C",
        }}
       >
        Conheça nossos projetos
        <ArrowRight size={20} />
       </motion.button>
      </div>
     </motion.div>
    ))}

    {/* Controles */}
    <button
     onClick={prevSlide}
     className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all"
    >
     <ArrowLeft size={24} />
    </button>
    <button
     onClick={nextSlide}
     className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all"
    >
     <ArrowRight size={24} />
    </button>

    {/* Dots */}
    <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
     {slides.map((_, index) => (
      <button
       key={index}
       onClick={() => setCurrentSlide(index)}
       className={`h-2 rounded-full transition-all ${
        index === currentSlide ? "bg-white w-8" : "bg-white/50 w-2"
       }`}
      />
     ))}
    </div>
   </section>

   {/* Stats Section REFATORADA */}
   <section className="py-20 px-4">
    <div className="max-w-7xl mx-auto">
     {/* Header */}
     <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12"
     >
      <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
       Nosso <span className="text-[#499D4B]">Impacto</span>
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
       Cada número representa vidas transformadas e uma comunidade mais forte
      </p>
     </motion.div>

     {/* Grid de stats */}
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {stats.map((stat, index) => (
       <StatCard
        key={index}
        value={stat.value}
        suffix={stat.suffix}
        label={stat.label}
        icon={stat.icon}
        color={stat.color}
        delay={index * 0.1}
       />
      ))}
     </div>
    </div>
   </section>

   {/* CTA Section */}
   <section className="py-16 px-4">
    <div className="max-w-5xl mx-auto">
     <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-[#499D4B] to-[#3d8540] rounded-3xl p-12 shadow-2xl relative overflow-hidden"
     >
      {/* SVG decorativo */}
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
        Faça parte dessa transformação
       </h2>
       <p className="text-lg mb-8 opacity-95 max-w-2xl mx-auto">
        Sua contribuição ou tempo fazem a diferença na vida de centenas de
        pessoas
       </p>
       <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-white text-[#499D4B] font-bold px-8 py-4 rounded-full hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
         <Heart size={20} fill="currentColor" />
         Doar Agora
        </button>
        <button className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white/20 transition-all flex items-center justify-center gap-2">
         <Users size={20} />
         Seja Voluntário
        </button>
       </div>
      </div>
     </motion.div>
    </div>
   </section>
  </div>
 );
}
