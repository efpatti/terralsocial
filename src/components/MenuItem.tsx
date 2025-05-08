"use client";

import Link from "next/link";
import { NavbarItem } from "@/types/navbar";

type MenuItemProps = {
 item: NavbarItem;
 onClick?: () => void; // Para fechar menu mobile
};

export const MenuItem = ({ item, onClick }: MenuItemProps) => {
 if ("href" in item) {
  // Item simples
  return (
   <Link
    href={item.href}
    onClick={onClick}
    className="font-medium text-gray-800 hover:text-[#499D4B] transition-colors px-3 py-1 rounded-md hover:bg-gray-50"
   >
    {item.label}
   </Link>
  );
 }

 // Item com submenu
 return (
  <div className="group relative">
   <button className="font-medium text-gray-800 hover:text-[#499D4B] transition-colors px-3 py-1 rounded-md hover:bg-gray-50">
    {item.label}
   </button>
   <div className="absolute hidden group-hover:flex flex-col bg-white shadow-md rounded-md py-2 mt-2 transition-all duration-200">
    {item.subitems.map((sub) => (
     <Link
      key={sub.href}
      href={sub.href}
      onClick={onClick}
      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
     >
      {sub.label}
     </Link>
    ))}
   </div>
  </div>
 );
};
