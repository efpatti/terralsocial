import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateVolunteerSchema = z.object({
 name: z
  .string()
  .min(2, "Nome deve ter pelo menos 2 caracteres")
  .max(100, "Nome não pode ter mais de 100 caracteres")
  .trim()
  .optional(),
 email: z.string().email("E-mail inválido").toLowerCase().trim().optional(),
 phone: z
  .string()
  .min(10, "Telefone deve ter pelo menos 10 dígitos")
  .max(20, "Telefone não pode ter mais de 20 caracteres")
  .trim()
  .optional(),
 area: z
  .string()
  .min(1, "Área de interesse é obrigatória")
  .max(100, "Área não pode ter mais de 100 caracteres")
  .optional(),
 availability: z
  .string()
  .min(1, "Disponibilidade é obrigatória")
  .max(50, "Disponibilidade não pode ter mais de 50 caracteres")
  .optional(),
 experience: z
  .string()
  .max(1000, "Experiência não pode ter mais de 1000 caracteres")
  .optional()
  .nullable(),
 message: z
  .string()
  .max(2000, "Mensagem não pode ter mais de 2000 caracteres")
  .optional()
  .nullable(),
});

/**
 * GET /api/volunteers/[id]
 * Retorna um voluntário específico
 */
export async function GET(
 request: NextRequest,
 context: { params: Promise<{ id: string }> }
) {
 try {
  const params = await context.params;
  const session = await getServerSession(authOptions);

  if (
   !session?.user?.roleId ||
   (session.user.roleId !== 1 && session.user.roleId !== 2)
  ) {
   return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }

  const volunteer = await prisma.volunteer.findUnique({
   where: { id: parseInt(params.id) },
  });

  if (!volunteer) {
   return NextResponse.json(
    { error: "Voluntário não encontrado" },
    { status: 404 }
   );
  }

  return NextResponse.json({ volunteer });
 } catch (error) {
  console.error("Error fetching volunteer:", error);
  return NextResponse.json(
   { error: "Erro ao buscar voluntário" },
   { status: 500 }
  );
 }
}

/**
 * PUT /api/volunteers/[id]
 * Atualiza um voluntário
 */
export async function PUT(
 request: NextRequest,
 context: { params: Promise<{ id: string }> }
) {
 try {
  const params = await context.params;
  const session = await getServerSession(authOptions);

  if (
   !session?.user?.roleId ||
   (session.user.roleId !== 1 && session.user.roleId !== 2)
  ) {
   return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }

  const body = await request.json();
  const validation = updateVolunteerSchema.safeParse(body);

  if (!validation.success) {
   return NextResponse.json(
    {
     error: "Dados inválidos",
     details: validation.error.errors,
    },
    { status: 400 }
   );
  }

  const { name, email, phone, area, availability, experience, message } =
   validation.data;

  // Verificar se email já existe (se estiver sendo alterado)
  if (email) {
   const existingVolunteer = await prisma.volunteer.findUnique({
    where: { email },
   });

   if (existingVolunteer && existingVolunteer.id !== parseInt(params.id)) {
    return NextResponse.json(
     { error: "Este e-mail já está cadastrado" },
     { status: 409 }
    );
   }
  }

  const volunteer = await prisma.volunteer.update({
   where: { id: parseInt(params.id) },
   data: {
    ...(name && { name }),
    ...(email && { email }),
    ...(phone && { phone }),
    ...(area && { area }),
    ...(availability && { availability }),
    ...(experience !== undefined && { experience }),
    ...(message !== undefined && { message }),
   },
  });

  return NextResponse.json({
   success: true,
   message: "Voluntário atualizado com sucesso",
   volunteer,
  });
 } catch (error) {
  console.error("Error updating volunteer:", error);

  if (error && typeof error === "object" && "code" in error) {
   const prismaError = error as { code: string };
   if (prismaError.code === "P2025") {
    return NextResponse.json(
     { error: "Voluntário não encontrado" },
     { status: 404 }
    );
   }
  }

  return NextResponse.json(
   { error: "Erro ao atualizar voluntário" },
   { status: 500 }
  );
 }
}

/**
 * DELETE /api/volunteers/[id]
 * Remove um voluntário
 */
export async function DELETE(
 request: NextRequest,
 context: { params: Promise<{ id: string }> }
) {
 try {
  const params = await context.params;
  const session = await getServerSession(authOptions);

  if (
   !session?.user?.roleId ||
   (session.user.roleId !== 1 && session.user.roleId !== 2)
  ) {
   return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }

  await prisma.volunteer.delete({
   where: { id: parseInt(params.id) },
  });

  return NextResponse.json({
   success: true,
   message: "Voluntário removido com sucesso",
  });
 } catch (error) {
  console.error("Error deleting volunteer:", error);

  if (error && typeof error === "object" && "code" in error) {
   const prismaError = error as { code: string };
   if (prismaError.code === "P2025") {
    return NextResponse.json(
     { error: "Voluntário não encontrado" },
     { status: 404 }
    );
   }
  }

  return NextResponse.json(
   { error: "Erro ao remover voluntário" },
   { status: 500 }
  );
 }
}
