"use client";
import { useState } from "react";
import { X, Menu, Heart, HandHeart } from "lucide-react";
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
   className="shadow-sm relative z-50 bg-white border-t-2"
   style={{ borderColor: terralTheme.colors.primary }}
  >
   {/* Desktop: Tudo alinhado horizontalmente */}
   <div className="hidden md:flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
    {/* CTA Esquerda */}
    <motion.div
     initial={{ opacity: 0, x: -20 }}
     animate={{ opacity: 1, x: 0 }}
     transition={{ duration: 0.5, ease: "easeOut" }}
    >
     <Link href="/voluntario">
      <Button
       variant="ghost"
       className="text-gray-700 font-semibold hover:text-[#499D4B] hover:bg-green-50 transition-all duration-200 flex items-center gap-2 px-4 py-2"
      >
       <HandHeart size={18} />
       <span>Seja Voluntário</span>
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

    {/* CTA Direita */}
    <motion.div
     initial={{ opacity: 0, x: 20 }}
     animate={{ opacity: 1, x: 0 }}
     transition={{ duration: 0.5, ease: "easeOut" }}
    >
     <Link href="/doar">
      <Button
       className="text-white font-semibold px-6 py-2 shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2"
       style={{ backgroundColor: terralTheme.colors.primary }}
       onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#3d8540";
       }}
       onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = terralTheme.colors.primary;
       }}
      >
       <Heart size={16} fill="white" />
       <span>Doe Agora</span>
      </Button>
     </Link>
    </motion.div>
   </div>

   {/* Mobile */}
   <div className="md:hidden">
    <div className="flex justify-between items-center px-4 py-3">
     <span
      className="font-bold text-base"
      style={{ color: terralTheme.colors.primary }}
     >
      MENU
     </span>

     <div className="flex items-center gap-2">
      <Link href="/doar">
       <Button
        size="sm"
        className="text-white text-xs font-semibold px-4 py-2 shadow-sm flex items-center gap-1.5"
        style={{ backgroundColor: terralTheme.colors.primary }}
       >
        <Heart size={14} fill="white" />
        <span>Doar</span>
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

    <AnimatePresence>
     {isOpen && (
      <motion.div
       initial={{ opacity: 0, height: 0 }}
       animate={{ opacity: 1, height: "auto" }}
       exit={{ opacity: 0, height: 0 }}
       transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
       className="flex flex-col items-stretch gap-1 py-2 px-2 overflow-hidden bg-gray-50 border-t"
      >
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

       <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="mt-2 pt-2 border-t"
       >
        <Link href="/voluntario" onClick={() => setIsOpen(false)}>
         <div
          className="px-4 py-3 rounded-md bg-white border-2 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-green-50 transition-colors"
          style={{
           borderColor: terralTheme.colors.primary,
           color: terralTheme.colors.primary,
          }}
         >
          <HandHeart size={16} />
          Seja Voluntário
         </div>
        </Link>
       </motion.div>
      </motion.div>
     )}
    </AnimatePresence>
   </div>
  </nav>
 );
};

export default Navbar;
