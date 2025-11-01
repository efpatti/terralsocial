"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { User, Mail, Lock, LogOut, Leaf, Save, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

const containerVariants = {
 hidden: { opacity: 0, y: 20 },
 visible: {
  opacity: 1,
  y: 0,
  transition: {
   duration: 0.5,
   staggerChildren: 0.1,
  },
 },
};

const itemVariants = {
 hidden: { opacity: 0, x: -20 },
 visible: {
  opacity: 1,
  x: 0,
  transition: { type: "spring" as const, stiffness: 100 },
 },
};

export default function UserPreferencesPage() {
 const { data: session } = useSession();
 const router = useRouter();
 const [saving, setSaving] = useState(false);
 const [message, setMessage] = useState<{
  type: "success" | "error";
  text: string;
 } | null>(null);
 const [formData, setFormData] = useState({
  name: session?.user?.name || "",
  email: session?.user?.email || "",
 });

 const handleUpdateProfile = async (e: React.FormEvent) => {
  e.preventDefault();
  setSaving(true);
  setMessage(null);

  try {
   const response = await fetch("/api/user/preferences", {
    method: "PUT",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
   });

   if (response.ok) {
    setMessage({ type: "success", text: "Perfil atualizado com sucesso!" });
   } else {
    setMessage({
     type: "error",
     text: "Erro ao atualizar perfil. Tente novamente.",
    });
   }
  } catch (error) {
   console.error("Update error:", error);
   setMessage({
    type: "error",
    text: "Erro ao atualizar perfil. Tente novamente.",
   });
  } finally {
   setSaving(false);
  }
 };

 const handleSignOut = async () => {
  await signOut({ callbackUrl: "/" });
 };

 return (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50 py-12 px-4">
   <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className="max-w-4xl mx-auto"
   >
    {/* Header */}
    <motion.div variants={itemVariants} className="text-center mb-8">
     <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#499D4B] to-[#3ca0e7] rounded-2xl mb-4 shadow-lg">
      <Settings className="w-8 h-8 text-white" />
     </div>
     <h1 className="text-4xl font-bold text-[#2C3E50] mb-2">
      Preferências da Conta
     </h1>
     <p className="text-[#6B7280]">
      Gerencie suas informações pessoais e configurações
     </p>
    </motion.div>

    <div className="grid md:grid-cols-3 gap-6">
     {/* Sidebar */}
     <motion.div variants={itemVariants} className="md:col-span-1">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
       <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-[#499D4B] to-[#3ca0e7] rounded-full flex items-center justify-center mb-4 shadow-lg">
         <User className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-xl font-bold text-[#2C3E50] mb-1">
         {session?.user?.name || "Usuário"}
        </h2>
        <p className="text-sm text-[#6B7280] mb-6">{session?.user?.email}</p>

        <button
         onClick={handleSignOut}
         className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-red-500 hover:bg-red-500 hover:text-white transition-all text-red-500 font-semibold group"
        >
         <LogOut className="w-5 h-5" />
         <span>Sair da Conta</span>
        </button>
       </div>
      </div>
     </motion.div>

     {/* Main Content */}
     <motion.div variants={itemVariants} className="md:col-span-2">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
       <h3 className="text-2xl font-bold text-[#2C3E50] mb-6 flex items-center gap-2">
        <User className="w-6 h-6 text-[#499D4B]" />
        Informações Pessoais
       </h3>

       {message && (
        <motion.div
         initial={{ opacity: 0, y: -10 }}
         animate={{ opacity: 1, y: 0 }}
         className={`mb-6 p-4 rounded-xl ${
          message.type === "success"
           ? "bg-green-50 border border-green-200 text-green-700"
           : "bg-red-50 border border-red-200 text-red-700"
         }`}
        >
         <p className="text-sm font-medium text-center">{message.text}</p>
        </motion.div>
       )}

       <form onSubmit={handleUpdateProfile} className="space-y-6">
        <div>
         <label
          htmlFor="name"
          className="block text-sm font-semibold text-[#2C3E50] mb-2"
         >
          Nome Completo
         </label>
         <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
          <input
           id="name"
           type="text"
           value={formData.name}
           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
           className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[#2C3E50] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#499D4B] focus:border-transparent transition-all"
           placeholder="Seu nome"
          />
         </div>
        </div>

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
           className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[#2C3E50] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#499D4B] focus:border-transparent transition-all"
           placeholder="seu@email.com"
          />
         </div>
        </div>

        <button
         type="submit"
         disabled={saving}
         className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#499D4B] to-[#3ca0e7] hover:from-[#3d8a3f] hover:to-[#3090d7] transition-all text-white font-semibold shadow-lg shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
         {saving ? (
          <>
           <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
           >
            <Leaf className="w-5 h-5" />
           </motion.div>
           <span>Salvando...</span>
          </>
         ) : (
          <>
           <Save className="w-5 h-5" />
           <span>Salvar Alterações</span>
          </>
         )}
        </button>
       </form>

       <div className="mt-8 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-bold text-[#2C3E50] mb-4 flex items-center gap-2">
         <Lock className="w-5 h-5 text-[#499D4B]" />
         Segurança
        </h3>
        <p className="text-sm text-[#6B7280] mb-4">
         Para alterar sua senha ou outras configurações de segurança, entre em
         contato com o suporte.
        </p>
        <button
         type="button"
         onClick={() => router.push("/fale-conosco")}
         className="px-6 py-2.5 rounded-xl border-2 border-[#499D4B] hover:bg-[#499D4B] hover:text-white transition-all text-[#499D4B] font-semibold"
        >
         Falar com Suporte
        </button>
       </div>
      </div>
     </motion.div>
    </div>

    {/* Quick Links */}
    <motion.div
     variants={itemVariants}
     className="mt-8 grid md:grid-cols-3 gap-4"
    >
     <button
      onClick={() => router.push("/")}
      className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:border-[#499D4B] transition-all group"
     >
      <Leaf className="w-8 h-8 text-[#499D4B] mb-2 group-hover:scale-110 transition-transform" />
      <h4 className="font-semibold text-[#2C3E50] mb-1">Página Inicial</h4>
      <p className="text-sm text-[#6B7280]">Voltar para o início</p>
     </button>

     <button
      onClick={() => router.push("/como-ajudar")}
      className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:border-[#499D4B] transition-all group"
     >
      <User className="w-8 h-8 text-[#3ca0e7] mb-2 group-hover:scale-110 transition-transform" />
      <h4 className="font-semibold text-[#2C3E50] mb-1">Como Ajudar</h4>
      <p className="text-sm text-[#6B7280]">Faça a diferença</p>
     </button>

     <button
      onClick={() => router.push("/fale-conosco")}
      className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:border-[#499D4B] transition-all group"
     >
      <Mail className="w-8 h-8 text-[#499D4B] mb-2 group-hover:scale-110 transition-transform" />
      <h4 className="font-semibold text-[#2C3E50] mb-1">Fale Conosco</h4>
      <p className="text-sm text-[#6B7280]">Entre em contato</p>
     </button>
    </motion.div>
   </motion.div>
  </div>
 );
}
