"use client";
import { motion } from "framer-motion";
import { HandHeart, Heart } from "lucide-react";
import Link from "next/link";
import { terralTheme } from "@/constants/theme";

interface MobileMenuFooterProps {
    onClose: () => void;
}

export function MobileMenuFooter({ onClose }: MobileMenuFooterProps) {
    return (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-4 pb-4 px-4">
            <div className="space-y-2.5">
                <Link href="/como-ajudar/seja-voluntario" onClick={onClose}>
                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-4 py-2.5 rounded-lg border font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200 relative overflow-hidden group"
                        style={{
                            borderColor: terralTheme.colors.primary,
                            color: terralTheme.colors.primary,
                        }}
                    >
                        <div className="absolute inset-0 bg-green-50 opacity-0 group-active:opacity-100 transition-opacity duration-200" />
                        <HandHeart size={16} className="relative z-10" />
                        <span className="relative z-10">Seja Voluntário</span>
                    </motion.button>
                </Link>

                <Link href="/como-ajudar/doe-agora" onClick={onClose}>
                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-4 py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 text-white relative overflow-hidden group transition-all duration-200"
                        style={{ backgroundColor: terralTheme.colors.primary }}
                    >
                        <div className="absolute inset-0 bg-black opacity-0 group-active:opacity-10 transition-opacity duration-200" />
                        <Heart size={16} fill="white" className="relative z-10" />
                        <span className="relative z-10">Doe Agora</span>
                    </motion.button>
                </Link>

                <p className="text-center text-xs text-gray-400 mt-3 font-medium">
                    Terral Social © 2025
                </p>
            </div>
        </div>
    );
}