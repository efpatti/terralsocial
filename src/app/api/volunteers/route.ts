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

// Headers CORS
const corsHeaders = {
 "Access-Control-Allow-Origin": "*",
 "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
 "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

/**
 * OPTIONS handler para CORS
 */
export async function OPTIONS() {
 return new Response(null, {
  status: 200,
  headers: corsHeaders,
 });
}

/**
 * POST /api/volunteers
 * Cria um novo registro de voluntário no banco de dados
 */
export async function POST(request: NextRequest) {
 try {
  console.log("🔍 POST /api/volunteers - Iniciando...");

  // Testar conexão com o banco primeiro
  await prisma.$connect();
  console.log("✅ Conexão com banco estabelecida");

  const body = await request.json();
  console.log("📦 Dados recebidos:", {
   ...body,
   phone: body.phone ? "***" : "empty",
  });

  // Validação com Zod
  const validatedData = volunteerSchema.parse(body);
  console.log("✅ Dados validados");

  // Verificar se email já existe
  const existingVolunteer = await prisma.volunteer.findUnique({
   where: { email: validatedData.email },
  });

  if (existingVolunteer) {
   console.log("⚠️ Email já cadastrado:", validatedData.email);
   return NextResponse.json(
    {
     error: "Já existe um voluntário cadastrado com este e-mail",
     field: "email",
    },
    {
     status: 409,
     headers: corsHeaders,
    }
   );
  }

  // Criar voluntário no banco
  console.log("💾 Criando voluntário no banco...");
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
   {
    status: 201,
    headers: corsHeaders,
   }
  );
 } catch (error) {
  // Log de erro detalhado
  console.error("❌ Erro detalhado no POST:", {
   error,
   message: error instanceof Error ? error.message : "Unknown error",
   stack: error instanceof Error ? error.stack : undefined,
   // Informações do banco (sem senha)
   dbUrl: process.env.DATABASE_URL
    ? process.env.DATABASE_URL.replace(/(:\/\/[^:]+:)[^@]+(@)/, "$1***$2")
    : "DATABASE_URL not set",
   nodeEnv: process.env.NODE_ENV,
  });

  // Erros de validação do Zod
  if (error instanceof z.ZodError) {
   const firstError = error.errors[0];
   return NextResponse.json(
    {
     error: "Dados inválidos",
     message: firstError.message,
     field: firstError.path.join("."),
     details: process.env.NODE_ENV === "development" ? error.errors : undefined,
    },
    {
     status: 400,
     headers: corsHeaders,
    }
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
     {
      status: 409,
      headers: corsHeaders,
     }
    );
   }

   if (prismaError.code === "P2003") {
    return NextResponse.json(
     { error: "Erro de referência no banco de dados" },
     {
      status: 400,
      headers: corsHeaders,
     }
    );
   }

   // Erro de conexão com o banco
   if (prismaError.code === "P1001" || prismaError.code === "P1017") {
    return NextResponse.json(
     {
      error: "Sistema temporariamente indisponível",
      message:
       "Estamos com problemas técnicos. Tente novamente em alguns minutos.",
     },
     {
      status: 503,
      headers: corsHeaders,
     }
    );
   }
  }

  // Erro genérico para o cliente
  return NextResponse.json(
   {
    error: "Erro interno do servidor",
    message:
     "Não foi possível processar sua inscrição. Tente novamente mais tarde.",
    // Apenas em desenvolvimento mostra detalhes
    ...(process.env.NODE_ENV === "development" && {
     debug: error instanceof Error ? error.message : "Unknown error",
    }),
   },
   {
    status: 500,
    headers: corsHeaders,
   }
  );
 } finally {
  await prisma.$disconnect().catch(() => {
   console.log("🔌 Conexão com banco fechada");
  });
 }
}

/**
 * GET /api/volunteers
 * Lista todos os voluntários (com paginação)
 * Query params: page, limit
 */
export async function GET(request: NextRequest) {
 try {
  console.log("🔍 GET /api/volunteers - Iniciando...");

  // Testar conexão com o banco primeiro
  await prisma.$connect();
  console.log("✅ Conexão com banco estabelecida");

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  console.log("📊 Buscando voluntários...", { page, limit, skip });

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

  console.log(
   `✅ Encontrados ${volunteers.length} voluntários de ${total} total`
  );

  return NextResponse.json(
   {
    success: true,
    data: volunteers,
    pagination: {
     page,
     limit,
     total,
     totalPages: Math.ceil(total / limit),
    },
   },
   {
    headers: corsHeaders,
   }
  );
 } catch (error) {
  console.error("❌ Erro detalhado no GET:", {
   error,
   message: error instanceof Error ? error.message : "Unknown error",
   stack: error instanceof Error ? error.stack : undefined,
   // Informações do banco (sem senha)
   dbUrl: process.env.DATABASE_URL
    ? process.env.DATABASE_URL.replace(/(:\/\/[^:]+:)[^@]+(@)/, "$1***$2")
    : "DATABASE_URL not set",
   nodeEnv: process.env.NODE_ENV,
  });

  // Erro específico para problemas de banco
  if (error && typeof error === "object" && "code" in error) {
   const prismaError = error as { code: string };
   if (prismaError.code === "P1001" || prismaError.code === "P1017") {
    return NextResponse.json(
     {
      error: "Sistema temporariamente indisponível",
      message:
       "Estamos com problemas técnicos. Tente novamente em alguns minutos.",
     },
     {
      status: 503,
      headers: corsHeaders,
     }
    );
   }
  }

  return NextResponse.json(
   {
    error: "Erro ao buscar voluntários",
    // Apenas em desenvolvimento mostra detalhes
    ...(process.env.NODE_ENV === "development" && {
     debug: error instanceof Error ? error.message : "Unknown error",
    }),
   },
   {
    status: 500,
    headers: corsHeaders,
   }
  );
 } finally {
  await prisma.$disconnect().catch(() => {
   console.log("🔌 Conexão com banco fechada");
  });
 }
}
