"use client";

import { motion } from "framer-motion";
import { useState, useEffect, Suspense } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { LogIn, Mail, Lock, Leaf } from "lucide-react";

const containerVariants = {
 hidden: { opacity: 0, scale: 0.95 },
 visible: {
  opacity: 1,
  scale: 1,
  transition: {
   duration: 0.5,
   staggerChildren: 0.1,
  },
 },
};

const itemVariants = {
 hidden: { y: 20, opacity: 0 },
 visible: {
  y: 0,
  opacity: 1,
  transition: { type: "spring" as const, stiffness: 100 },
 },
};

function SignInContent() {
 const router = useRouter();
 const searchParams = useSearchParams();
 const { status } = useSession();
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");
 const [formData, setFormData] = useState({
  email: "",
  password: "",
 });

 useEffect(() => {
  if (status === "authenticated") {
   const continueTo =
    searchParams?.get("continueTo") || "/protected/user-preferences";
   router.push(continueTo);
  }
 }, [status, router, searchParams]);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
   const result = await signIn("credentials", {
    email: formData.email,
    password: formData.password,
    redirect: false,
   });

   if (result?.error) {
    setError("Email ou senha incorretos");
   } else if (result?.ok) {
    const continueTo =
     searchParams?.get("continueTo") || "/protected/user-preferences";
    router.push(continueTo);
   }
  } catch (err) {
   setError("Erro ao fazer login. Tente novamente.");
   console.error("Sign-in error:", err);
  } finally {
   setLoading(false);
  }
 };

 if (status === "loading") {
  return (
   <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50">
    <div className="flex flex-col items-center gap-4">
     <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
     >
      <Leaf className="w-8 h-8 text-[#499D4B]" />
     </motion.div>
     <p className="text-[#2C3E50] font-medium">Carregando...</p>
    </div>
   </div>
  );
 }

 return (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-4">
   <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className="w-full max-w-md"
   >
    {/* Logo/Brand */}
    <motion.div variants={itemVariants} className="text-center mb-8">
     <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#499D4B] to-[#3ca0e7] rounded-2xl mb-4 shadow-lg">
      <Leaf className="w-8 h-8 text-white" />
     </div>
     <h1 className="text-3xl font-bold text-[#2C3E50] mb-2">
      Bem-vindo de volta!
     </h1>
     <p className="text-[#6B7280]">Entre para acessar sua conta</p>
    </motion.div>

    <motion.div
     variants={itemVariants}
     className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
    >
     {error && (
      <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
       <p className="text-red-700 text-sm text-center font-medium">{error}</p>
      </div>
     )}

     <form onSubmit={handleSubmit} className="p-6 space-y-5">
      <div>
       <label
        htmlFor="email"
        className="block text-sm font-semibold text-[#2C3E50] mb-2"
       >
        Email
       </label>
       <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
        <input
         id="email"
         type="email"
         value={formData.email}
         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
         required
         className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[#2C3E50] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#499D4B] focus:border-transparent transition-all"
         placeholder="seu@email.com"
        />
       </div>
      </div>

      <div>
       <label
        htmlFor="password"
        className="block text-sm font-semibold text-[#2C3E50] mb-2"
       >
        Senha
       </label>
       <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
        <input
         id="password"
         type="password"
         value={formData.password}
         onChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
         }
         required
         className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[#2C3E50] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#499D4B] focus:border-transparent transition-all"
         placeholder="••••••••"
        />
       </div>
      </div>

      <button
       type="submit"
       disabled={loading}
       className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#499D4B] to-[#3ca0e7] hover:from-[#3d8a3f] hover:to-[#3090d7] transition-all text-white font-semibold shadow-lg shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
      >
       {loading ? (
        <>
         <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
         >
          <Leaf className="w-5 h-5" />
         </motion.div>
         <span>Entrando...</span>
        </>
       ) : (
        <>
         <LogIn className="w-5 h-5" />
         <span>Entrar</span>
        </>
       )}
      </button>
     </form>

     <div className="px-6 pb-6">
      <div className="relative my-6">
       <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200"></div>
       </div>
       <div className="relative flex justify-center text-sm">
        <span className="px-4 bg-white text-[#6B7280] font-medium">
         Ainda não tem conta?
        </span>
       </div>
      </div>

      <Link
       href="/auth/sign-up"
       className="w-full flex items-center justify-center py-3.5 rounded-xl border-2 border-[#499D4B] hover:bg-[#499D4B] hover:text-white transition-all text-[#499D4B] font-semibold group"
      >
       <span>Criar conta grátis</span>
      </Link>
     </div>
    </motion.div>

    <motion.p
     variants={itemVariants}
     className="text-center text-sm text-[#6B7280] mt-6"
    >
     Ao entrar, você concorda com nossos{" "}
     <Link
      href="/termos"
      className="text-[#499D4B] hover:underline font-medium"
     >
      Termos de Uso
     </Link>
    </motion.p>
   </motion.div>
  </div>
 );
}

export default function SignInPage() {
 return (
  <Suspense
   fallback={
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50">
     <div className="flex flex-col items-center gap-4">
      <motion.div
       animate={{ rotate: 360 }}
       transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
       <Leaf className="w-8 h-8 text-[#499D4B]" />
      </motion.div>
      <p className="text-[#2C3E50] font-medium">Carregando...</p>
     </div>
    </div>
   }
  >
   <SignInContent />
  </Suspense>
 );
}
