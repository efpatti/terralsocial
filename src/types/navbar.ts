export type NavbarItem =
 | { label: string; href: string; subitems?: undefined }
 | {
    label: string;
    subitems: { label: string; href: string }[];
    href?: undefined;
   };
