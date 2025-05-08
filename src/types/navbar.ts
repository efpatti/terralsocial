export type NavbarItem =
 | { label: string; href: string }
 | { label: string; subitems: { label: string; href: string }[] };
