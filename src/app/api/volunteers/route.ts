import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Schema de validação robusto com mensagens em português
const volunteerSchema = z.object({
 name: z
  .string()
  .min(2, "Nome deve ter pelo menos 2 caracteres")
  .max(100, "Nome não pode ter mais de 100 caracteres")
  .trim(),
 email: z.string().email("E-mail inválido").toLowerCase().trim(),
 phone: z
  .string()
  .min(10, "Telefone deve ter pelo menos 10 dígitos")
  .max(20, "Telefone não pode ter mais de 20 caracteres")
  .trim(),
 area: z
  .string()
  .min(1, "Área de interesse é obrigatória")
  .max(100, "Área não pode ter mais de 100 caracteres"),
 availability: z
  .string()
  .min(1, "Disponibilidade é obrigatória")
  .max(50, "Disponibilidade não pode ter mais de 50 caracteres"),
 experience: z
  .string()
  .max(1000, "Experiência não pode ter mais de 1000 caracteres")
  .optional()
  .nullable()
  .transform((val) => val || null),
 message: z
  .string()
  .max(2000, "Mensagem não pode ter mais de 2000 caracteres")
  .optional()
  .nullable()
  .transform((val) => val || null),
});

export type VolunteerInput = z.infer<typeof volunteerSchema>;

/**
 * POST /api/volunteers
 * Cria um novo registro de voluntário no banco de dados
 */
export async function POST(request: NextRequest) {
 try {
  const body = await request.json();

  // Validação com Zod
  const validatedData = volunteerSchema.parse(body);

  // Verificar se email já existe
  const existingVolunteer = await prisma.volunteer.findUnique({
   where: { email: validatedData.email },
  });

  if (existingVolunteer) {
   return NextResponse.json(
    {
     error: "Já existe um voluntário cadastrado com este e-mail",
     field: "email",
    },
    { status: 409 }
   );
  }

  // Criar voluntário no banco
  const volunteer = await prisma.volunteer.create({
   data: {
    name: validatedData.name,
    email: validatedData.email,
    phone: validatedData.phone,
    area: validatedData.area,
    availability: validatedData.availability,
    experience: validatedData.experience,
    message: validatedData.message,
   },
   select: {
    id: true,
    name: true,
    email: true,
    area: true,
    createdAt: true,
   },
  });

  // Log de sucesso
  console.log("✅ Novo voluntário cadastrado:", {
   id: volunteer.id,
   email: volunteer.email,
   area: volunteer.area,
  });

  return NextResponse.json(
   {
    success: true,
    message: "Inscrição realizada com sucesso! Em breve entraremos em contato.",
    data: volunteer,
   },
   { status: 201 }
  );
 } catch (error) {
  // Erros de validação do Zod
  if (error instanceof z.ZodError) {
   const firstError = error.errors[0];
   return NextResponse.json(
    {
     error: "Dados inválidos",
     message: firstError.message,
     field: firstError.path.join("."),
     details: error.errors,
    },
    { status: 400 }
   );
  }

  // Erros do Prisma (ex: violação de constraint)
  if (error && typeof error === "object" && "code" in error) {
   const prismaError = error as { code: string; meta?: unknown };

   if (prismaError.code === "P2002") {
    return NextResponse.json(
     {
      error: "E-mail já cadastrado",
      field: "email",
     },
     { status: 409 }
    );
   }

   if (prismaError.code === "P2003") {
    return NextResponse.json(
     { error: "Erro de referência no banco de dados" },
     { status: 400 }
    );
   }
  }

  // Log de erro detalhado no servidor
  console.error("❌ Erro ao criar voluntário:", error);

  // Erro genérico para o cliente
  return NextResponse.json(
   {
    error: "Erro interno do servidor",
    message:
     "Não foi possível processar sua inscrição. Tente novamente mais tarde.",
   },
   { status: 500 }
  );
 }
}

/**
 * GET /api/volunteers
 * Lista todos os voluntários (com paginação)
 * Query params: page, limit
 */
export async function GET(request: NextRequest) {
 try {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  const [volunteers, total] = await Promise.all([
   prisma.volunteer.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
    select: {
     id: true,
     name: true,
     email: true,
     phone: true,
     area: true,
     availability: true,
     createdAt: true,
    },
   }),
   prisma.volunteer.count(),
  ]);

  return NextResponse.json({
   success: true,
   data: volunteers,
   pagination: {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
   },
  });
 } catch (error) {
  console.error("❌ Erro ao listar voluntários:", error);
  return NextResponse.json(
   { error: "Erro ao buscar voluntários" },
   { status: 500 }
  );
 }
}
