"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function NavbarLogo() {
    return (
        <Link href="/" className="flex items-center gap-2 group">
            <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="relative w-10 h-10"
            >
                <Image
                    src="/terral.png"
                    alt="Logo TERRAL Social"
                    fill
                    className="object-contain drop-shadow-md"
                    priority
                />
            </motion.div>

            <div className="flex flex-col leading-none">
        <span className="text-base font-semibold tracking-tight text-gray-800 group-hover:text-[#499D4B] transition-colors">
          TERRAL
        </span>
                <span className="text-xs font-medium text-gray-600 tracking-wide">
          SOCIAL
        </span>
            </div>
        </Link>
    );
}