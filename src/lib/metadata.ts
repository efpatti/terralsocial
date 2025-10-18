// Mapeamento de rotas para títulos de página
export const pageTitles: Record<string, string> = {
 "/": "Início",
 "/quem-somos/nossa-historia": "Nossa História",
 "/quem-somos/nossa-sede": "Nossa Sede",
 "/quem-somos/depoimentos": "Depoimentos",
 "/oficinas/teatro": "Teatro",
 "/oficinas/capoeira": "Capoeira",
 "/oficinas/costura": "Costura",
 "/oficinas/artes": "Artes",
 "/oficinas/ingles": "Inglês",
 "/oficinas/reforco-escolar": "Reforço Escolar",
 "/como-ajudar/doe-agora": "Doe Agora",
 "/como-ajudar/seja-cliente-do-bazar": "Seja Cliente do Bazar",
 "/como-ajudar/seja-voluntario": "Seja Voluntário",
 "/como-ajudar/seja-um-parceiro": "Seja um Parceiro",
 "/fale-conosco": "Fale Conosco",
};

export function generatePageTitle(pathname: string): string {
 const title = pageTitles[pathname];

 if (title) {
  return `${title} | Terral Social`;
 }

 // Fallback: tentar gerar título a partir da URL
 const segments = pathname.split("/").filter(Boolean);
 if (segments.length > 0) {
  const lastSegment = segments[segments.length - 1];
  const formattedTitle = lastSegment
   .split("-")
   .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
   .join(" ");
  return `${formattedTitle} | Terral Social`;
 }

 return "Terral Social";
}

export const defaultMetadata = {
 title: "Terral Social",
 description:
  "Transformando vidas através da arte, educação e cultura no Recreio dos Bandeirantes, Rio de Janeiro.",
 keywords: [
  "Terral Social",
  "ONG",
  "Recreio dos Bandeirantes",
  "Teatro",
  "Capoeira",
  "Oficinas",
  "Educação",
  "Arte",
  "Cultura",
  "Rio de Janeiro",
 ],
};
