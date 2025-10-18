"use client";

import Image from "next/image";
import { terralTheme } from "@/constants/theme";
import { motion } from "framer-motion";

const LogoHeader = () => {
 return (
  <motion.div
   initial={{ opacity: 0, y: -20 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.6, ease: "easeOut" }}
   className="py-6 flex flex-col items-center bg-gradient-to-b from-white to-gray-50"
  >
   {/* Logo MAIOR */}
   <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] relative mb-3">
    <Image
     src="/terral.png"
     alt="Logo TERRAL Social"
     fill
     className="object-contain drop-shadow-md"
     priority
    />
   </div>

   {/* Textos com hierarquia forte */}
   <div className="text-center">
    <h1 className="text-4xl md:text-5xl font-semibold tracking-wider">
     TERRAL
    </h1>
    <p className="text-sm md:text-base font-medium tracking-[0.4em] mt-1">
     SOCIAL
    </p>
    <p className="text-xs text-gray-500 mt-2 max-w-md px-4">
     Transformando vidas através da arte e educação
    </p>
   </div>
  </motion.div>
 );
};

export default LogoHeader;
