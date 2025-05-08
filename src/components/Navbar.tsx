"use client";

import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { MdCloseFullscreen } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { items } from "@/data/items";
import { MenuItem } from "./MenuItem";

const Navbar = () => {
 const [isOpen, setIsOpen] = useState(false);

 return (
  <nav className="bg-white shadow-md relative z-50 border-t border-gray-100">
   {/* Desktop Menu */}
   <div className="hidden md:flex justify-center gap-6 py-3">
    {items.map((item) => (
     <MenuItem key={item.label} item={item} />
    ))}
   </div>

   {/* Mobile Menu Button */}
   <div className="flex md:hidden justify-between items-center px-4 py-2">
    <span className="font-medium text-[#499D4B]">MENU</span>
    <Button
     variant="ghost"
     size="icon"
     onClick={() => setIsOpen(!isOpen)}
     className="text-gray-700 hover:bg-[#499D4B]/10 hover:text-[#499D4B]"
    >
     {isOpen ? <MdCloseFullscreen size={24} /> : <FaBars size={24} />}
    </Button>
   </div>

   {/* Mobile Menu */}
   {isOpen && (
    <div className="flex flex-col items-stretch gap-1 py-2 px-2 bg-white border-t">
     {items.map((item) =>
      "href" in item ? (
       <MenuItem
        key={item.label}
        item={item}
        onClick={() => setIsOpen(false)}
       />
      ) : (
       item.subitems.map((sub) => (
        <MenuItem
         key={sub.href}
         item={{ label: sub.label, href: sub.href }}
         onClick={() => setIsOpen(false)}
        />
       ))
      )
     )}
    </div>
   )}
  </nav>
 );
};

export default Navbar;
