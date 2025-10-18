"use client";
import { useState } from "react";
import { X, Menu, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { items } from "@/data/items";
import { MenuItem } from "./MenuItem";
import { motion, AnimatePresence } from "framer-motion";
import { terralTheme } from "@/constants/theme";
import Link from "next/link";

const Navbar = () => {
 const [isOpen, setIsOpen] = useState(false);

 return (
  <nav
   className="shadow-sm relative z-50 bg-white"
   style={{ borderColor: terralTheme.colors.primary }}
  >
   {/* Desktop Menu */}
   <div className="hidden md:flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
    {/* CTA Esquerda - Seja Voluntário */}
    <motion.div
     initial={{ opacity: 0, x: -20 }}
     animate={{ opacity: 1, x: 0 }}
     transition={{ duration: 0.5, ease: "easeOut" }}
    >
     <Link href="/voluntario">
      <Button className="bg-blue-600/70 hover:bg-blue-600 text-white font-semibold px-5 py-2 shadow-md hover:shadow-lg transition-all duration-300 uppercase">
       Seja Voluntário
      </Button>
     </Link>
    </motion.div>

    {/* Menu Central */}
    <div className="flex gap-6">
     {items.map((item, idx) => (
      <motion.div
       key={item.label}
       initial={{ opacity: 0, y: -10 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{
        duration: 0.4,
        delay: idx * 0.06,
        ease: [0.25, 0.1, 0.25, 1],
       }}
      >
       <MenuItem item={item} />
      </motion.div>
     ))}
    </div>

    {/* CTA Direita - Doe Agora */}
    <motion.div
     initial={{ opacity: 0, x: 20 }}
     animate={{ opacity: 1, x: 0 }}
     transition={{ duration: 0.5, ease: "easeOut" }}
    >
     <Link href="/doar">
      <Button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 shadow-md hover:shadow-lg transition-all duration-300 uppercase">
       Doe Agora
      </Button>
     </Link>
    </motion.div>
   </div>

   {/* Mobile Menu */}
   <div className="md:hidden">
    {/* Header Mobile com CTAs */}
    <div className="flex justify-between items-center px-4 py-3 border-b">
     <span
      className="font-bold text-base"
      style={{ color: terralTheme.colors.primary }}
     >
      MENU
     </span>

     <div className="flex items-center gap-2">
      {/* CTAs compactos no mobile */}
      <Link href="/doar">
       <Button
        size="sm"
        className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded-full"
       >
        <Heart size={14} fill="white" />
       </Button>
      </Link>

      <Button
       variant="ghost"
       size="icon"
       onClick={() => setIsOpen(!isOpen)}
       className="rounded-full"
       style={{
        color: terralTheme.colors.primary,
        backgroundColor: isOpen
         ? `${terralTheme.colors.primary}15`
         : "transparent",
       }}
      >
       <AnimatePresence mode="wait">
        {isOpen ? (
         <motion.div
          key="close"
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
         >
          <X size={24} />
         </motion.div>
        ) : (
         <motion.div
          key="menu"
          initial={{ opacity: 0, rotate: 90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: -90 }}
          transition={{ duration: 0.2 }}
         >
          <Menu size={24} />
         </motion.div>
        )}
       </AnimatePresence>
      </Button>
     </div>
    </div>

    {/* Menu Dropdown Mobile */}
    <AnimatePresence>
     {isOpen && (
      <motion.div
       initial={{ opacity: 0, height: 0 }}
       animate={{ opacity: 1, height: "auto" }}
       exit={{ opacity: 0, height: 0 }}
       transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
       className="flex flex-col items-stretch gap-1 py-2 px-2 overflow-hidden bg-gray-50"
      >
       {/* Link "Seja Voluntário" dentro do menu mobile */}
       <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
       >
        <Link href="/voluntario" onClick={() => setIsOpen(false)}>
         <div className="px-4 py-3 bg-blue-50 text-blue-600 font-semibold text-sm flex items-center justify-center hover:bg-blue-100 transition-colors uppercase">
          Seja Voluntário
         </div>
        </Link>
       </motion.div>

       {items.map((item, idx) =>
        "href" in item ? (
         <motion.div
          key={item.label}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{
           duration: 0.3,
           delay: idx * 0.05,
           ease: [0.25, 0.1, 0.25, 1],
          }}
         >
          <MenuItem item={item} onClick={() => setIsOpen(false)} />
         </motion.div>
        ) : (
         item.subitems.map((sub, subIdx) => (
          <motion.div
           key={sub.href}
           initial={{ opacity: 0, x: -10 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -10 }}
           transition={{
            duration: 0.3,
            delay: (idx + subIdx) * 0.05,
            ease: [0.25, 0.1, 0.25, 1],
           }}
          >
           <MenuItem
            item={{ label: sub.label, href: sub.href }}
            onClick={() => setIsOpen(false)}
           />
          </motion.div>
         ))
        )
       )}
      </motion.div>
     )}
    </AnimatePresence>
   </div>
  </nav>
 );
};

export default Navbar;
