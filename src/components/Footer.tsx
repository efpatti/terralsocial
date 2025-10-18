"use client";
import React from "react";
import { motion } from "framer-motion";
import { Instagram, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { prefix } from "@/lib/imageHelper";

const TerralFooter = () => {
 const currentYear = new Date().getFullYear();

 const quickLinks = [
  { label: "Início", href: "/" },
  { label: "Quem Somos", href: "/quem-somos/nossa-historia" },
  { label: "Oficinas", href: "/oficinas/teatro" },
  { label: "Como Ajudar", href: "/como-ajudar/doe-agora" },
  { label: "Fale Conosco", href: "/fale-conosco" },
 ];

 return (
  <footer className="relative w-full bg-white border-t border-gray-200">
   <div className="max-w-7xl mx-auto px-6 py-12">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
     {/* Logo e Descrição */}
     <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center"
     >
      <div className="w-16 h-16 relative mb-3">
       <Image
        src={prefix("/terral.png")}
        alt="Logo TERRAL Social"
        fill
        className="object-contain"
       />
      </div>
      <h3 className="text-2xl font-semibold">TERRAL</h3>
      <p className="text-lg text-gray-600 tracking-wider">SOCIAL</p>
      <p className="text-xs text-gray-500">
       Transformando vidas através da arte e educação
      </p>
     </motion.div>

     {/* Links Rápidos */}
     <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
     >
      <h4 className="text-sm font-bold text-gray-900 mb-4">Links Rápidos</h4>
      <nav className="space-y-2">
       {quickLinks.map((link, idx) => (
        <Link
         key={idx}
         href={link.href}
         className="block text-sm text-gray-600 hover:text-[#499D4B] transition-colors"
        >
         {link.label}
        </Link>
       ))}
      </nav>
     </motion.div>

     {/* Contato */}
     <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
     >
      <h4 className="text-sm font-bold text-gray-900 mb-4">Contato</h4>
      <div className="space-y-3">
       <a
        href="mailto:terralsocial@gmail.com"
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#499D4B] transition-colors"
       >
        <Mail className="w-4 h-4" />
        terralsocial@gmail.com
       </a>
       <div className="flex items-start gap-2 text-sm text-gray-600">
        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <span>
         R. Sen. Rui Carneiro, 601
         <br />
         Recreio dos Bandeirantes, RJ
        </span>
       </div>
      </div>
     </motion.div>

     {/* Redes Sociais */}
     <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
     >
      <h4 className="text-sm font-bold text-gray-900 mb-4">Redes Sociais</h4>
      <div className="space-y-2">
       <a
        href="https://www.instagram.com/terralsocial/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-700 transition-colors"
       >
        <Instagram className="w-4 h-4" />
        @terralsocial
       </a>
       <a
        href="https://www.instagram.com/bazarterral/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-700 transition-colors"
       >
        <Instagram className="w-4 h-4" />
        @bazarterral
       </a>
      </div>
     </motion.div>
    </div>

    {/* Copyright */}
    <motion.div
     initial={{ opacity: 0 }}
     whileInView={{ opacity: 1 }}
     viewport={{ once: true }}
     className="pt-8 border-t border-gray-200 text-center"
    >
     <p className="text-xs text-gray-500">
      © {currentYear} Terral Social. Todos os direitos reservados.
     </p>
    </motion.div>
   </div>
  </footer>
 );
};

export default TerralFooter;
