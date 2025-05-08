"use client";

import Image from "next/image";

const LogoHeader = () => {
 return (
  <div className="py-4 flex flex-col items-center space-y-1 bg-white">
   {/* Emblema - Sugiro criar uma versão com a cor #499D4B */}
   <Image
    src="/emblema_terral.svg"
    alt="Logo Terral Social"
    width={60}
    height={60}
    className="object-contain"
   />

   {/* Texto TERRAL - Mantendo o estilo limpo mas com cor da marca */}
   <h1 className="text-3xl font-light tracking-widest text-[#499D4B]">
    TERRAL
   </h1>

   {/* Texto SOCIAL - Mais destacado */}
   <p className="text-xs font-medium tracking-[0.3em] text-gray-600">SOCIAL</p>
  </div>
 );
};

export default LogoHeader;
