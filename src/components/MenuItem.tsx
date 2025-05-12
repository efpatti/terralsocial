"use client";

import Link from "next/link";
import { NavbarItem } from "@/types/navbar";

type MenuItemProps = {
 item: NavbarItem;
 onClick?: () => void;
};

export const MenuItem = ({ item, onClick }: MenuItemProps) => {
 // Item com submenu
 if (item.subitems && item.subitems.length > 0) {
  return (
   <div className="group relative">
    <button
     className="flex items-center font-medium text-gray-800 hover:text-[#499D4B] transition-colors px-4 py-2 rounded-md hover:bg-gray-50"
     aria-expanded="false"
     aria-haspopup="true"
    >
     {item.label}
     <svg
      className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
     >
      <path
       strokeLinecap="round"
       strokeLinejoin="round"
       strokeWidth={2}
       d="M19 9l-7 7-7-7"
      />
     </svg>
    </button>
    <div className="absolute left-0 z-10 hidden group-hover:block w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
     <div className="py-1">
      {item.subitems.map((sub) => (
       <Link
        key={sub.href}
        href={sub.href}
        onClick={onClick}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
       >
        {sub.label}
       </Link>
      ))}
     </div>
    </div>
   </div>
  );
 }

 // Item simples
 return (
  <Link
   href={item.href || "#"}
   onClick={onClick}
   className="block font-medium text-gray-800 hover:text-[#499D4B] transition-colors px-4 py-2 rounded-md hover:bg-gray-50"
  >
   {item.label}
  </Link>
 );
};
