"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const LogoHeader = () => {
 return (
  <motion.div
   initial={{ opacity: 0, y: -20 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.6, ease: "easeOut" }}
   className="py-3 flex flex-col items-center bg-gradient-to-b from-white to-gray-50"
  >
   {/* Logo MAIOR */}
   <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] relative mb-2">
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
    <h1 className="text-3xl md:text-4xl font-semibold tracking-wider">
     TERRAL
    </h1>
    <p className="text-sm md:text-base font-medium tracking-[0.4em]">
     SOCIAL
    </p>
   </div>
  </motion.div>
 );
};

export default LogoHeader;
