const basePath = "/terralsocial";

/**
 * Adiciona o basePath a um caminho de imagem para funcionar no GitHub Pages.
 * @param src O caminho original da imagem (ex: /terral.png)
 * @returns O caminho com o basePath (ex: /terralsocial/terral.png)
 */
export const prefix = (src: string) => {
 // Evita adicionar o prefixo se já estiver presente ou se for um URL completo/dado
 if (
  src.startsWith("http") ||
  src.startsWith("data:") ||
  src.startsWith(basePath)
 ) {
  return src;
 }
 return `${basePath}${src}`;
};
