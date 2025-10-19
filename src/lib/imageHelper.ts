const basePath = ""; // ou remova completamente

export const prefix = (src: string) => {
 // Evita adicionar o prefixo se já estiver presente ou se for um URL completo/dado
 if (src.startsWith("http") || src.startsWith("data:")) {
  return src;
 }
 return `${basePath}${src}`; // basePath vazio, retorna src normal
};
