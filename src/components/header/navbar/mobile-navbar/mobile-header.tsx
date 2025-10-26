"use client";
import { Button } from "@/components/ui/button";
import { X, Menu, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { terralTheme } from "@/constants/theme";
import Link from "next/link";
import { MobileLogo } from "./mobile-logo";

interface MobileHeaderProps {
    isOpen: boolean;
    onToggle: () => void;
}

export function MobileHeader({ isOpen, onToggle }: MobileHeaderProps) {
    return (
        <div className="md:hidden flex items-center justify-between px-4 py-2">
            <Link href="/como-ajudar/doe-agora">
                <Button
                    size="sm"
                    className="text-white text-xs font-semibold px-3 py-1.5 shadow-sm flex items-center gap-1.5"
                    style={{ backgroundColor: terralTheme.colors.primary }}
                >
                    <Heart size={14} fill="white" />
                    <span>Doar</span>
                </Button>
            </Link>

            <div className="flex-1 flex justify-center">
                <MobileLogo />
            </div>

            <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="rounded-full"
                style={{ color: terralTheme.colors.primary }}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90 }}
                            animate={{ rotate: 0 }}
                            exit={{ rotate: 90 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X size={24} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="menu"
                            initial={{ rotate: 90 }}
                            animate={{ rotate: 0 }}
                            exit={{ rotate: -90 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Menu size={24} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </Button>
        </div>
    );
}