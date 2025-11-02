"use client";

import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import AuthGuard from "../components/auth_guard";

export default function Layout({ children }: { children: ReactNode }) {
 const { status } = useSession();

 if (status === "loading") {
  return (
   <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50">
    <p className="text-[#2C3E50] font-medium">Carregando...</p>
   </div>
  );
 }

 if (status === "unauthenticated") {
  return <AuthGuard />;
 }

 return <>{children}</>;
}
