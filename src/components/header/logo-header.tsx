"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const LogoHeader = () => {
  return (
    <motion.div
      // avoid replaying the mount animation when parent re-renders
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-3 flex flex-col items-center bg-gradient-to-b from-white to-gray-50"
    >
      {/* Logo MAIOR */}
      <Link href="/public" className="flex items-center gap-2 mb-2">
        <div className="relative w-20 h-20 md:w-[100px] md:h-[100px]">
          <Image
            src={"/terral.png"}
            alt="Logo TERRAL Social 3"
            fill
            className="object-contain drop-shadow-md"
            priority
          />
        </div>
      </Link>

      {/* Textos com hierarquia forte */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-wider">TERRAL</h1>
        <p className="text-sm md:text-base font-medium tracking-[0.4em]">SOCIAL</p>
      </div>
    </motion.div>
  );
};

export default LogoHeader;
