"use client";

import Image from "next/image";

const LogoHeader = () => {
 return (
  <div className="py-4 flex flex-col items-center">
   {/* Logo como imagem */}
   <div className="w-[60px] h-[60px] relative">
    <Image
     src={"/terral.png"}
     alt="Logo TERRAL"
     layout="fill"
     objectFit="contain"
    />
   </div>

   {/* Textos */}
   <div className="text-center mt-2">
    <h1 className="text-3xl font-medium tracking-widest text-slate-200">
     TERRAL
    </h1>
    <p className="text-xs font-normal tracking-[0.3em] text-slate-200 mt-[-4px]">
     SOCIAL
    </p>
   </div>
  </div>
 );
};

export default LogoHeader;
