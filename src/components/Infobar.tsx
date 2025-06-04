"use client";

import { MapPin, Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const Infobar = () => {
 const address =
  "Rua Senador Ruy Carneiro 601, Terreirão - Recreio dos Bandeirantes, RJ";

 const infoItems = [
  { icon: <MapPin size={14} />, text: address },
  { icon: <Clock size={14} />, text: "3ª e 5ª de 09h às 16h" },
  {
   icon: <Calendar size={14} />,
   text: "Sábados (conferir nas Redes Sociais)",
  },
 ];

 return (
  <motion.div
   initial={{ opacity: 0, y: -10 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.3 }}
   className="bg-white shadow-sm border-b border-gray-200 py-3 px-6"
  >
   <div className="max-w-6xl mx-auto">
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
     {infoItems.map((item, index) => (
      <motion.div
       key={index}
       whileHover={{ scale: 1.02 }}
       className="flex items-center text-sm text-gray-700 hover:text-gray-900 transition-colors"
      >
       <span className="text-gray-500 mr-2">{item.icon}</span>
       <span className="font-medium">{item.text}</span>
      </motion.div>
     ))}
    </div>
   </div>
  </motion.div>
 );
};

export default Infobar;
