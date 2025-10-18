"use client";
import React from "react";
import { motion } from "framer-motion";
import { Instagram, Mail, MapPin, Heart } from "lucide-react";

const TerralFooter = () => {
 const currentYear = new Date().getFullYear();

 return (
  <footer className="relative w-full bg-white border-t border-gray-200">
   <div className="max-w-7xl mx-auto px-6 py-16">
    {/* Grid principal */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
     {/* Sobre */}
     <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
     >
      <h3 className="text-2xl font-bold text-gray-900 mb-3">TERRAL</h3>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">
       Transformando vidas há 32 anos através da arte, educação e cultura.
      </p>
      <div className="flex items-center gap-2 text-pink-600">
       <Heart className="w-4 h-4 fill-current" />
       <span className="text-xs font-semibold">+200 pessoas atendidas</span>
      </div>
     </motion.div>

     {/* Contato */}
     <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
     >
      <h4 className="text-sm font-bold text-gray-900 mb-4">Contato</h4>
      <div className="space-y-3">
       <a
        href="mailto:terralsocial@gmail.com"
        className="flex items-center gap-2.5 text-gray-600 hover:text-red-600 transition-colors group"
       >
        <Mail className="w-4 h-4 flex-shrink-0" />
        <span className="text-sm">terralsocial@gmail.com</span>
       </a>
       <div className="flex items-start gap-2.5 text-gray-600">
        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <span className="text-sm leading-relaxed">
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
      transition={{ duration: 0.5, delay: 0.2 }}
     >
      <h4 className="text-sm font-bold text-gray-900 mb-4">Redes Sociais</h4>
      <div className="space-y-3">
       <a
        href="https://www.instagram.com/terralsocial/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 text-gray-600 hover:text-pink-600 transition-colors group"
       >
        <Instagram className="w-4 h-4" />
        <span className="text-sm">@terralsocial</span>
       </a>
       <a
        href="https://www.instagram.com/bazarterral/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 text-gray-600 hover:text-pink-600 transition-colors group"
       >
        <Instagram className="w-4 h-4" />
        <span className="text-sm">@bazarterral</span>
       </a>
      </div>
     </motion.div>
    </div>

    {/* Divider */}
    <div className="h-px w-full bg-gray-200 mb-8" />

    {/* Copyright */}
    <motion.div
     initial={{ opacity: 0 }}
     whileInView={{ opacity: 1 }}
     viewport={{ once: true }}
     transition={{ duration: 0.5, delay: 0.3 }}
     className="text-center"
    >
     <p className="text-xs text-gray-500">
      © {currentYear} Terral Social. Organização sem vínculos
      político-partidários, religiosos e lucrativos.
     </p>
    </motion.div>
   </div>
  </footer>
 );
};

export default TerralFooter;
