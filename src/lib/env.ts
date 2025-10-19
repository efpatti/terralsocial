import { z } from "zod";

const envSchema = z.object({
 DATABASE_URL: z.string().min(1, "DATABASE_URL é obrigatório"),
 NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
 REDIS_URL: z.string().optional(),
 NEXT_PUBLIC_APP_URL: z.string().url().optional(),
});

// Validar variáveis de ambiente na inicialização
export const env = envSchema.parse({
 DATABASE_URL: process.env.DATABASE_URL,
 NODE_ENV: process.env.NODE_ENV,
 REDIS_URL: process.env.REDIS_URL,
 NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});

export type Env = z.infer<typeof envSchema>;
