import { NavbarItem } from "@/types/navbar";

// Função para transformar label em slug
function labelToSlug(label: string): string {
 return label
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9\s-]/g, "")
  .replace(/\s+/g, "-")
  .replace(/-+/g, "-");
}

// Dados base apenas com labels
const rawItems = [
 {
  label: "Quem somos",
  subitems: [
   { label: "Nossa História" },
   { label: "Nossa Sede" },
   { label: "Missão e Visão" },
   { label: "Parcerias" },
   { label: "Depoimentos" },
  ],
 },
 {
  label: "Oficinas",
  subitems: [
   { label: "Teatro" },
   { label: "Capoeira" },
   { label: "Costura" },
   { label: "Artes" },
   { label: "Inglês" },
   { label: "Reforço escolar" },
  ],
 },
 {
  label: "Como Ajudar",
  subitems: [
   { label: "Seja Cliente do Bazar" },
   { label: "Seja voluntário" },
   { label: "Seja parceiro" },
  ],
 },
 { label: "Fale conosco" },
];

// Mapeamento com contexto hierárquico
export const items: NavbarItem[] = rawItems.map((item) => {
 const hasSubitems = item.subitems && item.subitems.length > 0;
 const parentSlug = labelToSlug(item.label);

 if (hasSubitems) {
  return {
   label: item.label,
   subitems: item.subitems.map((subitem) => ({
    label: subitem.label,
    href: `/${parentSlug}/${labelToSlug(subitem.label)}`, // 🎯 Aqui tá o pulo do gato
   })),
   href: undefined,
  };
 } else {
  return {
   label: item.label,
   href: `/${parentSlug}`,
   subitems: undefined,
  };
 }
});
