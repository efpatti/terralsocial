import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import VolunteersClientPage from "./volunteers-client";
import { Leaf } from "lucide-react";
import Link from "next/link";

export default async function AdminVolunteersPage() {
 const session = await getServerSession(authOptions);

 // Check authentication
 if (!session?.user) {
  redirect("/auth/sign-in?continueTo=/protected/admin/volunteers");
 }

 // Check authorization (roleId 1 = DEVELOPER, 2 = ADMIN_TERRAL)
 const userRoleId = session.user.roleId;
 if (!userRoleId || (userRoleId !== 1 && userRoleId !== 2)) {
  return (
   <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50 py-12 px-4">
    <div className="max-w-3xl mx-auto">
     <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#499D4B] to-[#3ca0e7] rounded-2xl mb-4 shadow-lg mx-auto">
       <Leaf className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-2xl font-bold text-[#2C3E50] mb-2">Acesso Negado</h1>
      <p className="text-[#6B7280] mb-6">
       Esta área é restrita a desenvolvedores e administradores.
      </p>
      <div className="flex gap-3 justify-center">
       <Link
        href="/"
        className="px-6 py-2 rounded-xl border border-[#499D4B] text-[#499D4B] hover:bg-[#499D4B] hover:text-white transition"
       >
        Voltar
       </Link>
      </div>
     </div>
    </div>
   </div>
  );
 }

 // Fetch volunteers
 const [volunteers, totalCount] = await Promise.all([
  prisma.volunteer.findMany({
   orderBy: { createdAt: "desc" },
   select: {
    id: true,
    name: true,
    email: true,
    phone: true,
    area: true,
    availability: true,
    experience: true,
    message: true,
    createdAt: true,
   },
  }),
  prisma.volunteer.count(),
 ]);

 // Serialize dates for client component
 const serializedVolunteers = volunteers.map((v) => ({
  ...v,
  createdAt: v.createdAt.toISOString(),
 }));

 return (
  <VolunteersClientPage
   initialVolunteers={serializedVolunteers}
   totalCount={totalCount}
  />
 );
}
