export const terralTheme = {
 colors: {
  primary: "#499D4B", // Verde logo
  secondary: "#3ca0e7", // Azul logo
  accent: "#E74C3C", // Vermelho logo (usar com parcimônia)
  text: {
   dark: "#2C3E50",
   light: "#FFFFFF",
   muted: "#6B7280",
  },
  bg: {
   primary: "#FFFFFF",
   secondary: "#F9FAFB", // Off-white acolhedor
   dark: "#499D4B", // Inverte a lógica: verde como fundo de destaque
  },
 },
 transitions: {
  default: "all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
 },
} as const;
