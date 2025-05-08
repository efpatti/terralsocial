"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { MdCloseFullscreen } from "react-icons/md";
import { Button } from "@/components/ui/button";

const items = [
 { label: "Quem somos", href: "/quem-somos" },
 {
  label: "Oficinas",
  href: "/oficinas",
  subitems: [
   {
    label: "Teatro",
    href: "/teatro",
   },
   {
    label: "Capoeira",
    href: "/capoeira",
   },
   {
    label: "Costura",
    href: "/costura",
   },
   {
    label: "Artes",
    href: "/artes",
   },
   {
    label: "Inglês",
    href: "/ingles",
   },
   {
    label: "Reforço escolar",
    href: "/reforco-escolar",
   },
  ],
 },
 { label: "Fale conosco", href: "/contato" },
];

const Navbar = () => {
 const [isOpen, setIsOpen] = useState(false);

 return (
  <nav className="bg-white shadow-md relative z-50 border-t border-gray-100">
   {/* Desktop Menu */}
   <div className="hidden md:flex justify-center gap-6 py-3">
    {items.map(({ label, href }) => (
     <Link
      key={href}
      href={href}
      className="font-medium text-gray-800 hover:text-[#499D4B] transition-colors px-3 py-1 rounded-md hover:bg-gray-50"
     >
      {label}
     </Link>
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
     {items.map(({ label, href }) => (
      <Link
       key={href}
       href={href}
       onClick={() => setIsOpen(false)}
       className="font-medium text-gray-800 hover:text-[#499D4B] px-4 py-3 rounded-md hover:bg-gray-50 transition-colors"
      >
       {label}
      </Link>
     ))}
    </div>
   )}
  </nav>
 );
};

export default Navbar;
