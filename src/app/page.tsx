"use client";
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useState, useRef } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

// Componente de Estatística
type Stat = {
 value: string;
 label: string;
 colorSchema: "green" | "yellow" | "blue" | "red";
};

interface Project {
 title: string;
 description: string;
 icon: string;
 color: string;
}

interface SlideType {
 title: string;
 description: string;
 bgColor: string;
 textColor: string;
 buttonColor: string;
}

const StatCard = ({ stat }: { stat: Stat }) => {
 const colorSchemes = {
  green: {
   bg: "bg-green-50",
   text: "text-green-800",
   border: "border-green-200",
   accent: "bg-green-500",
  },
  yellow: {
   bg: "bg-yellow-50",
   text: "text-yellow-800",
   border: "border-yellow-200",
   accent: "bg-yellow-500",
  },
  blue: {
   bg: "bg-blue-50",
   text: "text-blue-800",
   border: "border-blue-200",
   accent: "bg-blue-500",
  },
  red: {
   bg: "bg-red-50",
   text: "text-red-800",
   border: "border-red-200",
   accent: "bg-red-500",
  },
 };

 const colors = colorSchemes[stat.colorSchema] || colorSchemes.green;

 return (
  <motion.div
   variants={{
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
   }}
   className={`relative p-6 rounded-xl border-2 ${colors.bg} ${colors.border} ${colors.text} overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
  >
   <div className={`absolute top-0 left-0 h-1 w-full ${colors.accent}`} />
   <motion.div
    initial={{ scale: 0.9 }}
    whileInView={{ scale: 1 }}
    transition={{ type: "spring", stiffness: 300 }}
    className={`text-3xl font-extrabold mb-3 ${colors.text}`}
   >
    {stat.value}
   </motion.div>
   <motion.p
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.2 }}
    className="text-lg font-medium"
   >
    {stat.label}
   </motion.p>
   <div
    className={`absolute bottom-2 right-2 w-8 h-8 rounded-full ${colors.accent} opacity-10`}
   />
  </motion.div>
 );
};

// Componente de Projeto
const ProjectCard = ({
 project,
 index,
}: {
 project: Project;
 index: number;
}) => (
 <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
   hidden: { opacity: 0, y: 20 },
   visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }}
  custom={index}
  whileHover={{ y: -10 }}
  className={`p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border ${project.color}`}
 >
  <div className="text-4xl mb-4">{project.icon}</div>
  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
  <p>{project.description}</p>
  <button
   className={`mt-4 font-medium hover:opacity-80 transition-opacity ${
    index % 3 === 0
     ? "text-red-600"
     : index % 3 === 1
     ? "text-blue-600"
     : "text-green-600"
   }`}
  >
   Saiba mais →
  </button>
 </motion.div>
);

// Componente de Slide
const Slide = ({
 slide,
 isActive,
}: {
 slide: SlideType;
 isActive: boolean;
}) => (
 <motion.div
  initial={{ opacity: 0 }}
  animate={{
   opacity: isActive ? 1 : 0,
   zIndex: isActive ? 1 : 0,
  }}
  transition={{ duration: 0.5 }}
  className={`absolute inset-0 flex items-center justify-center ${slide.bgColor} ${slide.textColor}`}
 >
  <div className="container mx-auto px-6 text-center">
   <motion.h1
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.3 }}
    className="text-4xl md:text-6xl font-bold mb-6"
   >
    {slide.title}
   </motion.h1>
   <motion.p
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.5 }}
    className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
   >
    {slide.description}
   </motion.p>
   <motion.button
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 0.7 }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`px-8 py-3 rounded-lg font-bold shadow-lg ${slide.buttonColor}`}
   >
    Saiba mais
   </motion.button>
  </div>
 </motion.div>
);

// Serviço de dados (poderia ser movido para um arquivo separado)
const DataService = {
 getProjects: () => [
  {
   title: "Hortas Comunitárias",
   description: "Cultivando alimentos e cidadania em áreas urbanas",
   icon: "🌱",
   color: "bg-green-100 text-green-800 border-green-200",
  },
  {
   title: "Educação Ambiental",
   description: "Programas de conscientização para crianças e adultos",
   icon: "📚",
   color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
   title: "Reciclagem Solidária",
   description: "Transformando resíduos em renda para comunidades",
   icon: "♻️",
   color: "bg-red-100 text-red-800 border-red-200",
  },
 ],

 getStats: () => [
  {
   value: "15mil+",
   label: "Pessoas atendidas até hoje.",
   colorSchema: "green",
  },
  {
   value: "+200 pessoas",
   label: "Comunidades atendidas",
   colorSchema: "yellow",
  },
  {
   value: "+3000 pessoas",
   label: "já participaram de eventos e palestras.",
   colorSchema: "blue",
  },
  {
   value: "30 pessoas",
   label: "atendidas atualmente no Grupo AA.",
   colorSchema: "red",
  },
  {
   value: "600 brinquedos",
   label:
    "sob estimativa de serem doados na comunidade do Terreirão no dia das crianças.",
   colorSchema: "green",
  },
 ],

 getSlides: () => [
  {
   title: "Transformando Comunidades",
   description: "Projetos que unem desenvolvimento social e ambiental",
   bgColor: "bg-green-600",
   textColor: "text-white",
   buttonColor: "bg-white text-green-600",
  },
  {
   title: "Educação para o Futuro",
   description: "Capacitando jovens para um mundo sustentável",
   bgColor: "bg-blue-600",
   textColor: "text-white",
   buttonColor: "bg-white text-blue-600",
  },
  {
   title: "Ação Social Urgente",
   description: "Atendimento emergencial para comunidades vulneráveis",
   bgColor: "bg-red-600",
   textColor: "text-white",
   buttonColor: "bg-white text-red-600",
  },
 ],
};

export default function Home() {
 const [currentSlide, setCurrentSlide] = useState(0);
 const projects = DataService.getProjects();
 const stats = DataService.getStats();
 const slides = DataService.getSlides();
 const touchStartX = useRef<number | null>(null);
 const touchEndX = useRef<number | null>(null);

 // Touch event handlers for swipe
 const handleTouchStart = (e: React.TouchEvent) => {
  touchStartX.current = e.touches[0].clientX;
  touchEndX.current = null;
 };

 const handleTouchMove = (e: React.TouchEvent) => {
  touchEndX.current = e.touches[0].clientX;
 };

 const handleTouchEnd = () => {
  if (touchStartX.current !== null && touchEndX.current !== null) {
   const distance = touchStartX.current - touchEndX.current;
   if (Math.abs(distance) > 40) {
    if (distance > 0) {
     nextSlide(); // Swipe left
    } else {
     prevSlide(); // Swipe right
    }
   }
  }
  touchStartX.current = null;
  touchEndX.current = null;
 };

 const nextSlide = () => {
  setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
 };

 const prevSlide = () => {
  setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
 };

 return (
  <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
   <Head>
    <title>
     Terral Social - Transformando vidas através da sustentabilidade
    </title>
    <meta
     name="description"
     content="ONG dedicada a projetos sociais e ambientais"
    />
    <link rel="icon" href="/favicon.ico" />
   </Head>

   {/* Slider Section */}
   <section
    className="relative h-96 md:h-screen max-h-[800px] overflow-hidden"
    onTouchStart={handleTouchStart}
    onTouchMove={handleTouchMove}
    onTouchEnd={handleTouchEnd}
   >
    {slides.map((slide, index) => (
     <Slide key={index} slide={slide} isActive={index === currentSlide} />
    ))}

    <button
     onClick={prevSlide}
     className="absolute left-4 top-1/2 z-10 p-2 rounded-full bg-white bg-opacity-30 text-white hover:bg-opacity-50 transition-all"
    >
     <ArrowLeft size={24} />
    </button>
    <button
     onClick={nextSlide}
     className="absolute right-4 top-1/2 z-10 p-2 rounded-full bg-white bg-opacity-30 text-white hover:bg-opacity-50 transition-all"
    >
     <ArrowRight size={24} />
    </button>

    <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
     {slides.map((_, index) => (
      <button
       key={index}
       onClick={() => setCurrentSlide(index)}
       className={`w-3 h-3 rounded-full transition-all ${
        index === currentSlide ? "bg-white w-6" : "bg-white bg-opacity-50"
       }`}
      />
     ))}
    </div>
   </section>

   {/* Stats Section */}
   <section className="py-16 bg-gradient-to-b from-white to-gray-50">
    <div className="container mx-auto px-6">
     <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
       visible: {
        opacity: 1,
        y: 0,
        transition: {
         staggerChildren: 0.2,
        },
       },
       hidden: { opacity: 0, y: 20 },
      }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
     >
      {stats.map((stat, index) => (
       <StatCard key={index} stat={stat as Stat} />
      ))}
     </motion.div>

     <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-12 text-center"
     >
      <p className="text-gray-500 italic">
       Cada número representa uma vida transformada e uma comunidade impactada.
      </p>
     </motion.div>
    </div>
   </section>

   {/* Projects Section */}
   <section id="projects" className="container mx-auto px-6 py-20">
    <motion.div
     initial="hidden"
     whileInView="visible"
     viewport={{ once: true, margin: "-100px" }}
     variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
     }}
     className="text-center mb-16"
    >
     <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
      Nossos <span className="text-green-600">Projetos</span>
     </h2>
     <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
      Conheça nossas iniciativas que estão transformando realidades e promovendo
      desenvolvimento sustentável.
     </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
     {projects.map((project, index) => (
      <ProjectCard key={index} project={project} index={index} />
     ))}
    </div>
   </section>

   {/* About Section */}
   <section id="about" className="bg-gray-50 py-20">
    <div className="container mx-auto px-6">
     <div className="flex flex-col md:flex-row items-center gap-12">
      <motion.div
       initial={{ opacity: 0, x: -50 }}
       whileInView={{ opacity: 1, x: 0 }}
       viewport={{ once: true }}
       transition={{ duration: 0.6 }}
       className="md:w-1/2"
      >
       <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
        <Image
         src="/about-image.jpg"
         alt="Sobre a Terral Social"
         layout="fill"
         objectFit="cover"
        />
       </div>
      </motion.div>
      <motion.div
       initial={{ opacity: 0, x: 50 }}
       whileInView={{ opacity: 1, x: 0 }}
       viewport={{ once: true }}
       transition={{ duration: 0.6 }}
       className="md:w-1/2"
      >
       <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
        Sobre a <span className="text-green-600">Terral Social</span>
       </h2>
       <p className="text-gray-600 mb-4">
        Fundada em 2010, a Terral Social nasceu da vontade de criar um mundo
        mais justo e sustentável, onde o desenvolvimento social ande de mãos
        dadas com a preservação ambiental.
       </p>
       <p className="text-gray-600 mb-6">
        Nossa missão é implementar projetos que transformem realidades,
        capacitando pessoas e comunidades para se tornarem agentes de mudança em
        seus próprios territórios.
       </p>
       <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium shadow-md hover:bg-green-700 transition-colors"
       >
        Conheça nossa história
       </motion.button>
      </motion.div>
     </div>
    </div>
   </section>

   {/* Donation CTA */}
   <section id="donate" className="bg-green-700 text-white py-20">
    <div className="container mx-auto px-6 text-center">
     <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
       hidden: { opacity: 0, y: 20 },
       visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
     >
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
       Sua doação transforma vidas
      </h2>
      <p className="text-xl mb-8 max-w-3xl mx-auto">
       Com seu apoio, podemos ampliar nossos projetos e alcançar mais
       comunidades.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
       <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 bg-white text-green-700 rounded-lg font-bold shadow-lg hover:bg-gray-100 transition-colors"
       >
        Doar Agora
       </motion.button>
       <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 border border-white text-white rounded-lg font-bold hover:bg-green-600 transition-colors"
       >
        Seja um voluntário
       </motion.button>
      </div>
     </motion.div>
    </div>
   </section>

   {/* Contact Section */}
   <section id="contact" className="container mx-auto px-6 py-20">
    <div className="max-w-4xl mx-auto">
     <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
       hidden: { opacity: 0, y: 20 },
       visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
      className="text-center mb-12"
     >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
       Fale <span className="text-green-600">Conosco</span>
      </h2>
      <p className="mt-4 text-gray-600">
       Tem dúvidas, sugestões ou quer colaborar com nosso trabalho? Entre em
       contato!
      </p>
     </motion.div>

     <motion.form
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-2xl shadow-xl border border-green-100"
      style={{
       background: "linear-gradient(135deg, #f0fdf4 0%, #f9fafb 100%)",
      }}
     >
      <div className="md:col-span-2">
       <label
        htmlFor="name"
        className="block text-gray-700 mb-2 font-semibold tracking-wide"
       >
        Nome
       </label>
       <input
        type="text"
        id="name"
        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent bg-gray-50 text-gray-800 placeholder-gray-400 transition-all"
        placeholder="Seu nome completo"
       />
      </div>
      <div>
       <label
        htmlFor="email"
        className="block text-gray-700 mb-2 font-semibold tracking-wide"
       >
        E-mail
       </label>
       <input
        type="email"
        id="email"
        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent bg-gray-50 text-gray-800 placeholder-gray-400 transition-all"
        placeholder="seu@email.com"
       />
      </div>
      <div>
       <label
        htmlFor="phone"
        className="block text-gray-700 mb-2 font-semibold tracking-wide"
       >
        Telefone
       </label>
       <input
        type="tel"
        id="phone"
        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent bg-gray-50 text-gray-800 placeholder-gray-400 transition-all"
        placeholder="(00) 00000-0000"
       />
      </div>
      <div className="md:col-span-2">
       <label
        htmlFor="message"
        className="block text-gray-700 mb-2 font-semibold tracking-wide"
       >
        Mensagem
       </label>
       <textarea
        id="message"
        rows={5}
        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent bg-gray-50 text-gray-800 placeholder-gray-400 transition-all resize-none"
        placeholder="Como podemos te ajudar?"
       ></textarea>
      </div>
      <motion.button
       whileHover={{ scale: 1.04, backgroundColor: "#059669" }}
       whileTap={{ scale: 0.98 }}
       type="submit"
       className="md:col-span-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg font-bold shadow-lg hover:from-green-600 hover:to-green-800 transition-all tracking-wide text-lg border-2 border-green-600"
       style={{ letterSpacing: "0.05em" }}
      >
       <span className="inline-flex items-center gap-2">
        <svg
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 24 24"
         strokeWidth={2}
         stroke="currentColor"
         className="w-6 h-6"
        >
         <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12l8.954 8.955c.44.439 1.152.439 1.591 0L21.75 12M4.5 9.75V6.375A2.625 2.625 0 017.125 3.75h9.75A2.625 2.625 0 0119.5 6.375v3.375"
         />
        </svg>
        Enviar Mensagem
       </span>
      </motion.button>
     </motion.form>
    </div>
   </section>
  </div>
 );
}
