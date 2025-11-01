import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updatePreferencesSchema = z.object({
 name: z.string().min(2, "O nome deve ter no mínimo 2 caracteres").optional(),
 email: z.string().email("Email inválido").optional(),
});

export async function GET() {
 try {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
   return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
   where: { id: session.user.id },
   select: {
    id: true,
    name: true,
    email: true,
    image: true,
    createdAt: true,
   },
  });

  if (!user) {
   return NextResponse.json(
    { error: "Usuário não encontrado" },
    { status: 404 }
   );
  }

  return NextResponse.json({ user });
 } catch (error) {
  console.error("Get preferences error:", error);
  return NextResponse.json(
   { error: "Erro ao buscar preferências" },
   { status: 500 }
  );
 }
}

export async function PUT(request: NextRequest) {
 try {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
   return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const body = await request.json();
  const validation = updatePreferencesSchema.safeParse(body);

  if (!validation.success) {
   return NextResponse.json(
    { error: validation.error.errors[0].message },
    { status: 400 }
   );
  }

  const { name, email } = validation.data;

  // Se o email está sendo alterado, verificar se já existe
  if (email && email !== session.user.email) {
   const existingUser = await prisma.user.findUnique({
    where: { email },
   });

   if (existingUser && existingUser.id !== session.user.id) {
    return NextResponse.json(
     { error: "Este email já está em uso" },
     { status: 409 }
    );
   }
  }

  const updatedUser = await prisma.user.update({
   where: { id: session.user.id },
   data: {
    ...(name && { name }),
    ...(email && { email }),
   },
   select: {
    id: true,
    name: true,
    email: true,
    image: true,
   },
  });

  return NextResponse.json({
   message: "Preferências atualizadas com sucesso",
   user: updatedUser,
  });
 } catch (error) {
  console.error("Update preferences error:", error);
  return NextResponse.json(
   { error: "Erro ao atualizar preferências" },
   { status: 500 }
  );
 }
}
