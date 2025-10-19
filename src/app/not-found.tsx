"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
 Home,
 Users,
 Heart,
 Palette,
 ArrowLeft,
 Search,
 AlertCircle,
} from "lucide-react";

const quickLinks = [
 {
  href: "/",
  label: "Página Inicial",
  icon: Home,
  color: "#499D4B",
  description: "Voltar para a home",
 },
 {
  href: "/quem-somos/nossa-historia",
  label: "Nossa História",
  icon: Users,
  color: "#3ca0e7",
  description: "Conheça nossa trajetória",
 },
 {
  href: "/oficinas/artes",
  label: "Oficinas",
  icon: Palette,
  color: "#E74C3C",
  description: "Veja nossos programas",
 },
 {
  href: "/como-ajudar/doe-agora",
  label: "Doe Agora",
  icon: Heart,
  color: "#F59E0B",
  description: "Faça sua contribuição",
 },
];

export default function NotFound() {
 return (
  <div className="min-h-screen bg-gradient-to-br from-[#FFFBF5] via-white to-blue-50 flex items-center justify-center px-4">
   <div className="max-w-4xl w-full py-12">
    <motion.div
     initial={{ opacity: 0, scale: 0.9 }}
     animate={{ opacity: 1, scale: 1 }}
     transition={{ duration: 0.5 }}
     className="text-center mb-12"
    >
     {/* Ícone de erro */}
     <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      className="inline-flex items-center justify-center w-32 h-32 bg-yellow-100 rounded-full mb-8"
     >
      <AlertCircle size={64} className="text-yellow-600" />
     </motion.div>

     {/* Número 404 */}
     <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="text-8xl md:text-9xl font-black text-gray-200 leading-none mb-4"
      style={{
       textShadow: "2px 2px 0px rgba(73, 157, 75, 0.2)",
      }}
     >
      404
     </motion.h1>

     {/* Mensagem principal */}
     <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
     >
      <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-4">
       Página não encontrada
      </h2>
      <p className="text-lg text-gray-600 mb-2">
       Ops! Parece que você se perdeu no caminho... 🤔
      </p>
      <p className="text-gray-500">
       A página que você está procurando não existe ou foi movida.
      </p>
     </motion.div>

     {/* Botão voltar */}
     <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-8"
     >
      <Link
       href="/"
       className="inline-flex items-center gap-3 bg-gradient-to-r from-[#499D4B] to-[#3d8540] text-white font-bold px-8 py-4 rounded-full hover:shadow-lg transition-all"
      >
       <ArrowLeft size={20} />
       Voltar para o Início
      </Link>
     </motion.div>
    </motion.div>

    {/* Links rápidos */}
    <motion.div
     initial={{ opacity: 0, y: 30 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ delay: 0.6 }}
     className="mt-16"
    >
     <div className="flex items-center justify-center gap-3 mb-8">
      <Search className="text-gray-400" size={24} />
      <h3 className="text-xl font-bold text-gray-700">
       Ou explore estas páginas:
      </h3>
     </div>

     <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {quickLinks.map((link, index) => {
       const Icon = link.icon;
       return (
        <motion.div
         key={index}
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.7 + index * 0.1 }}
        >
         <Link
          href={link.href}
          className="group block bg-white rounded-2xl p-6 shadow-md border-2 border-gray-100 hover:border-gray-300 hover:shadow-lg transition-all"
         >
          <div
           className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
           style={{ backgroundColor: `${link.color}15` }}
          >
           <Icon size={24} style={{ color: link.color }} />
          </div>
          <h4 className="font-black text-lg mb-1" style={{ color: link.color }}>
           {link.label}
          </h4>
          <p className="text-sm text-gray-600">{link.description}</p>
         </Link>
        </motion.div>
       );
      })}
     </div>
    </motion.div>

    {/* Mensagem de suporte */}
    <motion.div
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     transition={{ delay: 1 }}
     className="mt-12 text-center"
    >
     <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 inline-block">
      <p className="text-sm text-gray-700">
       <strong>Precisa de ajuda?</strong> Entre em contato conosco:{" "}
       <a
        href="mailto:terralsocial@gmail.com"
        className="text-[#499D4B] font-bold hover:underline"
       >
        terralsocial@gmail.com
       </a>
      </p>
     </div>
    </motion.div>
   </div>
  </div>
 );
}
