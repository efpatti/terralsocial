"use client";

import { MapPin, Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { terralTheme } from "@/constants/theme";

const Infobar = () => {
 const infoItems = [
  {
   icon: <MapPin size={16} />,
   text: "R. Sen. Ruy Carneiro 601, Terreirão - Recreio, RJ",
  },
  {
   icon: <Clock size={16} />,
   text: "3ª e 5ª • 09h-16h",
  },
  {
   icon: <Calendar size={16} />,
   text: "Sábados (conferir redes sociais)",
  },
 ];

 return (
  <motion.div
   initial={{ opacity: 0 }}
   animate={{ opacity: 1 }}
   transition={{ duration: 0.6, ease: "easeOut" }}
   className="py-3 px-4"
   style={{ backgroundColor: terralTheme.colors.bg.dark }}
  >
   <div className="max-w-6xl mx-auto">
    <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6 text-white">
     {infoItems.map((item, index) => (
      <motion.div
       key={index}
       initial={{ opacity: 0, y: 8 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
       }}
       className="flex items-center gap-2 text-xs md:text-sm font-medium"
      >
       <span className="opacity-90">{item.icon}</span>
       <span>{item.text}</span>
      </motion.div>
     ))}
    </div>
   </div>
  </motion.div>
 );
};

export default Infobar;
