import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

/**
 * Hash de senha usando bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
 return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compara senha com hash
 */
export async function comparePassword(
 password: string,
 hash: string
): Promise<boolean> {
 return bcrypt.compare(password, hash);
}

/**
 * Valida formato de email
 */
export function isValidEmail(email: string): boolean {
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 return emailRegex.test(email);
}

/**
 * Valida força da senha (versão simplificada - apenas tamanho mínimo)
 */
export function isStrongPassword(password: string): {
 valid: boolean;
 errors: string[];
} {
 const errors: string[] = [];

 if (password.length < 8) {
  errors.push("A senha deve ter no mínimo 8 caracteres");
 }

 return {
  valid: errors.length === 0,
  errors,
 };
}
