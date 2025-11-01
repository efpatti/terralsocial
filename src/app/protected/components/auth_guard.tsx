"use client";

import { motion } from "framer-motion";
import { Suspense } from "react";
import { LOGIN_PATH } from "@/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock, Leaf } from "lucide-react";

function GuardContent() {
 const pathname = usePathname();
 return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-4">
   <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-md w-full"
   >
    <div className="flex flex-col items-center">
     <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#499D4B] to-[#3ca0e7] rounded-2xl mb-6 shadow-lg">
      <Lock className="w-8 h-8 text-white" />
     </div>

     <h1 className="text-3xl font-bold text-center text-[#2C3E50] mb-2">
      Área Protegida
     </h1>

     <p className="text-[#6B7280] text-center mb-6">
      Você precisa fazer login para acessar esta página
     </p>

     {pathname && (
      <div className="mb-6 p-3 bg-gray-50 rounded-lg w-full">
       <p className="text-xs text-[#6B7280] text-center break-all">
        Tentando acessar:{" "}
        <span className="font-mono text-[#499D4B]">{pathname}</span>
       </p>
      </div>
     )}

     <Link
      href={`${LOGIN_PATH}?continueTo=${pathname || ""}`}
      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#499D4B] to-[#3ca0e7] hover:from-[#3d8a3f] hover:to-[#3090d7] transition-all text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30"
     >
      <Leaf className="w-5 h-5" />
      <span>Fazer login</span>
     </Link>
    </div>
   </motion.div>
  </div>
 );
}

export default function AuthGuard() {
 return (
  <Suspense
   fallback={
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50">
     <p className="text-[#2C3E50] font-medium">Carregando...</p>
    </div>
   }
  >
   <GuardContent />
  </Suspense>
 );
}
