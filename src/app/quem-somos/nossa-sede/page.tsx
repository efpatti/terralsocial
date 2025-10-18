"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NossaSedesPage() {
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
       <MapPin size={48} />
       <h1 className="text-4xl md:text-5xl font-black">Nossa Sede</h1>
      </div>
      <p className="text-lg md:text-xl opacity-95 max-w-3xl">
       Visite-nos e conheça de perto o trabalho que realizamos na comunidade
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
           (21) 99999-9999
          </a>
         </div>
        </div>

        <div className="flex items-start gap-4">
         <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
          <Mail size={24} className="text-[#E74C3C]" />
         </div>
         <div>
          <h3 className="font-bold text-gray-800 mb-1">E-mail</h3>
          <a
           href="mailto:contato@terralsocial.org.br"
           className="text-gray-600 hover:text-[#499D4B] transition-colors"
          >
           contato@terralsocial.org.br
          </a>
         </div>
        </div>

        <div className="flex items-start gap-4">
         <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center flex-shrink-0">
          <Clock size={24} className="text-[#F59E0B]" />
         </div>
         <div>
          <h3 className="font-bold text-gray-800 mb-1">
           Horário de Funcionamento
          </h3>
          <p className="text-gray-600">
           Segunda a Sexta: 9h às 18h
           <br />
           Sábado: 9h às 13h
          </p>
         </div>
        </div>
       </div>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 border-2 border-green-200">
       <h3 className="font-bold text-gray-800 mb-3">Como Chegar</h3>
       <p className="text-gray-700 text-sm leading-relaxed">
        Nossa sede está localizada no Recreio dos Bandeirantes, com fácil acesso
        por transporte público e particular. Estamos próximos a pontos de
        referência importantes da região.
       </p>
      </div>
     </motion.div>

     {/* Google Maps Street View */}
     <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="lg:sticky lg:top-8 h-fit"
     >
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 overflow-hidden">
       <div className="bg-gradient-to-r from-[#499D4B] to-[#3d8540] p-4 text-white">
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
         title="Google Street View - Terral Social"
        />
       </div>
       <div className="p-4 bg-gray-50">
        <a
         href="https://www.google.com/maps/place/R.+Sen.+Rui+Carneiro,+601+-+Recreio+dos+Bandeirantes,+Rio+de+Janeiro+-+RJ/@-23.0177,-43.4639,17z"
         target="_blank"
         rel="noopener noreferrer"
         className="text-[#499D4B] font-bold hover:underline flex items-center gap-2 justify-center"
        >
         <MapPin size={18} />
         Abrir no Google Maps
        </a>
       </div>
      </div>
     </motion.div>
    </div>

    {/* CTA */}
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     className="mt-16 bg-gradient-to-br from-[#499D4B] to-[#3d8540] rounded-3xl p-12 shadow-2xl text-center text-white"
    >
     <h2 className="text-3xl md:text-4xl font-black mb-4">
      Venha nos visitar!
     </h2>
     <p className="text-lg mb-8 opacity-95 max-w-2xl mx-auto">
      Será um prazer recebê-lo em nossa sede. Conheça de perto nossos projetos e
      faça parte dessa transformação.
     </p>
     <Link
      href="/fale-conosco"
      className="inline-flex items-center gap-2 bg-white text-[#499D4B] font-bold px-8 py-4 rounded-full hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl"
     >
      <Mail size={20} />
      Entre em Contato
     </Link>
    </motion.div>
   </div>
  </div>
 );
}
