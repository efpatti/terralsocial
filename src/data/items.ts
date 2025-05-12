import { NavbarItem } from "@/types/navbar";

// Função para transformar label em href
function labelToHref(label: string): string {
 return (
  "/" +
  label
   .toLowerCase()
   .normalize("NFD")
   .replace(/[\u0300-\u036f]/g, "")
   .replace(/[^a-z0-9\s-]/g, "")
   .replace(/\s+/g, "-")
   .replace(/-+/g, "-")
 );
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

// Em items.ts, no mapeamento dos rawItems
export const items: NavbarItem[] = rawItems.map((item) => {
 const hasSubitems = item.subitems && item.subitems.length > 0;

 if (hasSubitems) {
  return {
   label: item.label,
   subitems: item.subitems.map((subitem) => ({
    label: subitem.label,
    href: labelToHref(subitem.label),
   })),
   // Explicitly set href to undefined to match the type
   href: undefined,
  };
 } else {
  return {
   label: item.label,
   href: labelToHref(item.label),
   // Explicitly set subitems to undefined to match the type
   subitems: undefined,
  };
 }
});
