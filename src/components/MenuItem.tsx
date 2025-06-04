"use client";

import Link from "next/link";
import { NavbarItem } from "@/types/navbar";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type MenuItemProps = {
 item: NavbarItem;
 onClick?: () => void;
};

export const MenuItem = ({ item, onClick }: MenuItemProps) => {
 const [isOpen, setIsOpen] = useState(false);
 const [isClient, setIsClient] = useState(false);

 useEffect(() => {
  setIsClient(true);
 }, []);

 // Item with submenu
 if (item.subitems && item.subitems.length > 0) {
  return (
   <div className="relative">
    <button
     className="flex items-center font-medium text-zinc-100 hover:text-[#3ca0e7] transition-colors px-4 py-2"
     aria-expanded={isOpen}
     aria-haspopup="true"
     onClick={() => setIsOpen(!isOpen)}
     onMouseEnter={() => isClient && setIsOpen(true)}
     onMouseLeave={() => isClient && setIsOpen(false)}
    >
     {item.label}
     <svg
      className={`ml-1 h-4 w-4 transition-transform ${
       isOpen ? "rotate-180" : ""
      }`}
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

    <AnimatePresence>
     {isClient && isOpen && (
      <motion.div
       className="absolute left-0 z-10 w-56 origin-top-left bg-white shadow-lg"
       initial={{ opacity: 0, y: -10 }}
       animate={{ opacity: 1, y: 0 }}
       exit={{ opacity: 0, y: -10 }}
       transition={{ duration: 0.2 }}
       onMouseEnter={() => setIsOpen(true)}
       onMouseLeave={() => setIsOpen(false)}
      >
       <div className="py-2 px-1">
        {item.subitems.map((sub) => (
         <motion.div
          key={sub.href}
          whileHover={{
           x: 5,
           transition: { duration: 0.3 },
          }}
          className="border-l-2 border-transparent"
         >
          <Link
           href={sub.href}
           onClick={() => {
            onClick?.();
            setIsOpen(false);
           }}
           className="block px-4 py-2 text-sm text-gray-700 transition-all duration-300 hover:border-l-2 hover:border-[#3ca0e7] hover:pl-6"
          >
           {sub.label}
          </Link>
         </motion.div>
        ))}
       </div>
      </motion.div>
     )}
    </AnimatePresence>
   </div>
  );
 }

 // Simple item
 return (
  <Link
   href={item.href || "#"}
   onClick={onClick}
   className="block font-medium text-zinc-100 hover:text-[#3ca0e7] transition-colors px-4 py-2"
  >
   {item.label}
  </Link>
 );
};
