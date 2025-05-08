import { NavbarItem } from "@/types/navbar";
export const items: NavbarItem[] = [
 {
  label: "Quem somos",
  subitems: [
   { label: "Nossa História", href: "/nossa-historia" },
   { label: "Parcerias", href: "/parcerias" },
  ],
 },
 {
  label: "Oficinas",
  subitems: [
   { label: "Teatro", href: "/teatro" },
   { label: "Capoeira", href: "/capoeira" },
   { label: "Costura", href: "/costura" },
   { label: "Artes", href: "/artes" },
   { label: "Inglês", href: "/ingles" },
   { label: "Reforço escolar", href: "/reforco-escolar" },
  ],
 },
 { label: "Fale conosco", href: "/contato" },
];
