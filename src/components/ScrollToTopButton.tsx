"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
 const [isVisible, setIsVisible] = useState(false);

 useEffect(() => {
  const toggleVisibility = () => {
   // Show button when page is scrolled down 300px
   if (window.scrollY > 300) {
    setIsVisible(true);
   } else {
    setIsVisible(false);
   }
  };

  window.addEventListener("scroll", toggleVisibility);

  return () => window.removeEventListener("scroll", toggleVisibility);
 }, []);

 const scrollToTop = () => {
  window.scrollTo({
   top: 0,
   behavior: "smooth",
  });
 };

 return (
  <AnimatePresence>
   {isVisible && (
    <motion.button
     initial={{ opacity: 0, scale: 0.5 }}
     animate={{ opacity: 1, scale: 1 }}
     exit={{ opacity: 0, scale: 0.5 }}
     transition={{ duration: 0.2 }}
     onClick={scrollToTop}
     className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-r from-[#499D4B] to-[#3d8540] text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all flex items-center justify-center group"
     aria-label="Voltar ao topo"
    >
     <ArrowUp
      size={24}
      className="group-hover:-translate-y-1 transition-transform"
     />
    </motion.button>
   )}
  </AnimatePresence>
 );
}
