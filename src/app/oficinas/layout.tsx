"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

export default function OficinasLayout({ children }: { children: ReactNode }) {
 return (
  <div className="min-h-screen bg-gray-50">
   <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="container mx-auto px-4 py-12"
   >
    {children}
   </motion.div>
  </div>
 );
}
