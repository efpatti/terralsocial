// src/lib/api.ts

/**
 * Obtém o basePath configurado no Next.js
 * Em produção: /terralsocial
 * Em dev também usa: /terralsocial
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "/terralsocial";

/**
 * Gera URL completa para chamadas de API
 * Funciona tanto no servidor quanto no cliente
 */
export function getApiUrl(path: string): string {
 // Remove barra inicial se existir
 const cleanPath = path.startsWith("/") ? path : `/${path}`;

 if (typeof window === "undefined") {
  // Server-side: retorna apenas o path com basePath
  return `${BASE_PATH}${cleanPath}`;
 }

 // Client-side: retorna URL completa com origin + basePath
 return `${window.location.origin}${BASE_PATH}${cleanPath}`;
}
