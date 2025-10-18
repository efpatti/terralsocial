import { NavbarItem } from "@/types/navbar";

const slugify = (value: string): string =>
 value
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9\s-]/g, "")
  .trim()
  .replace(/\s+/g, "-");

const path = (...parts: string[]): string =>
 "/" + parts.filter(Boolean).join("/");

const withHref =
 (base: string) => (entry: { label: string; href?: string }) => ({
  label: entry.label,
  href: entry.href ?? path(base, slugify(entry.label)),
 });

const mapItem = (item: any): NavbarItem => {
 const base = slugify(item.label);
 const href = item.href ?? path(base);

 if (!item.subitems) return { label: item.label, href };

 return {
  label: item.label,
  href,
  subitems: item.subitems.map(withHref(base)),
 };
};

const rawItems = [
 { label: "Início", href: "/" },
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
   { label: "Doe Agora" },
  ],
 },
 { label: "Fale conosco" },
];

export const items: NavbarItem[] = rawItems.map(mapItem);
