"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { items } from "@/data/items";
import { MobileLogo } from "./mobile-logo";
import { MobileMenuItem } from "./mobile-menu-item";
import { MobileMenuFooter } from "./mobile-menu-footer";

interface MobileMenuProps {
    isOpen: boolean;
    expandedItems: Record<string, boolean>;
    onToggleItem: (label: string) => void;
    onClose: () => void;
}

export function MobileMenu({
                               isOpen,
                               expandedItems,
                               onToggleItem,
                               onClose,
                           }: MobileMenuProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-white z-[100] md:hidden"
                >
                    <div className="flex justify-between items-center p-4 border-b">
                        <MobileLogo />
                        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                            <X size={20} />
                        </Button>
                    </div>

                    <div className="h-[calc(100vh-180px)] overflow-y-auto px-4 py-4">
                        {items.map((item, idx) => (
                            <MobileMenuItem
                                key={item.label}
                                item={item}
                                index={idx}
                                isExpanded={expandedItems[item.label]}
                                onToggle={() => onToggleItem(item.label)}
                                onClose={onClose}
                            />
                        ))}
                    </div>

                    <MobileMenuFooter onClose={onClose} />
                </motion.div>
            )}
        </AnimatePresence>
    );
}