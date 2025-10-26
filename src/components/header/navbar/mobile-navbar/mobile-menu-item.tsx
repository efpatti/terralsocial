"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { terralTheme } from "@/constants/theme";
import { NavbarItem } from "@/types/navbar-item";

interface MobileMenuItemProps {
    item: NavbarItem;
    index: number;
    isExpanded: boolean;
    onToggle: () => void;
    onClose: () => void;
}

export function MobileMenuItem({
                                   item,
                                   index,
                                   isExpanded,
                                   onToggle,
                                   onClose,
                               }: MobileMenuItemProps) {
    const pathname = usePathname();
    const hasSubitems = item.subitems && item.subitems.length > 0;
    const isActive = item.href
        ? item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href)
        : item.subitems?.some((sub) => pathname.startsWith(sub.href));

    if (hasSubitems) {
        return (
            <motion.div
                initial={{opacity: 0, x: -20}}
                animate={{opacity: 1, x: 0}}
                transition={{delay: index * 0.05}}
                className="mb-2"
            >
                <button
                    onClick={onToggle}
                    className="w-full px-3 py-2.5 rounded-lg font-medium text-sm relative transition-colors text-gray-900 bg-gray-50"
                    style={isActive ? {color: terralTheme.colors.primary} : {}}
                >
                    <div className="w-full flex items-center justify-center">
                        <span className="text-center">{item.label}</span>
                    </div>
                    {isActive && (
                        <div className="w-full flex justify-center">
              <span
                  className="block w-6 h-[2px] rounded mt-1"
                  style={{backgroundColor: terralTheme.colors.primary}}
              />
                        </div>
                    )}
                    <motion.div
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        animate={{rotate: isExpanded ? 180 : 0}}
                        transition={{duration: 0.2}}
                    >
                        <ChevronDown size={16}/>
                    </motion.div>
                </button>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{height: 0, opacity: 0}}
                            animate={{height: "auto", opacity: 1}}
                            exit={{height: 0, opacity: 0}}
                            transition={{duration: 0.3, ease: "easeInOut"}}
                            className="overflow-hidden mt-2"
                        >
                            <div className="bg-gradient-to-b from-gray-50 to-white rounded-lg p-2 space-y-1.5">
                                {item.subitems?.map((sub, subIdx) => {
                                    const isSubActive = pathname.startsWith(sub.href);
                                    return (
                                        <motion.div
                                            key={sub.href}
                                            initial={{x: -20, opacity: 0}}
                                            animate={{x: 0, opacity: 1}}
                                            transition={{delay: subIdx * 0.05}}
                                        >
                                            <Link
                                                href={sub.href}
                                                onClick={onClose}
                                                className={`block px-4 py-2.5 rounded-md text-sm transition-all duration-200 ${
                                                    isSubActive
                                                        ? "font-semibold bg-white"
                                                        : "font-normal text-gray-700 hover:bg-white hover:shadow-sm"
                                                }`}
                                                style={
                                                    isSubActive
                                                        ? {
                                                            color: terralTheme.colors.primary,
                                                            borderLeft: `3px solid ${terralTheme.colors.primary}`,
                                                        }
                                                        : {}
                                                }
                                            >
                                                <div className="flex items-center gap-2">
                          <span
                              className={`w-1.5 h-1.5 rounded-full transition-all ${
                                  isSubActive ? "opacity-0" : "opacity-100"
                              }`}
                              style={{
                                  backgroundColor: isSubActive ? "transparent" : "#d1d5db",
                              }}
                          />
                                                    <span>{sub.label}</span>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{opacity: 0, x: -20}}
            animate={{opacity: 1, x: 0}}
            transition={{delay: index * 0.05}}
            className="mb-2"
        >
            <Link
                href={item.href || "#"}
                onClick={onClose}
                className="block px-3 py-2.5 rounded-lg font-medium text-sm text-center transition-colors text-gray-900 bg-gray-50"
                style={isActive ? {color: terralTheme.colors.primary} : {}}
            >
                {item.label}
                {isActive && (
                    <span
                        className="block w-6 h-[2px] rounded mx-auto mt-1"
                        style={{backgroundColor: terralTheme.colors.primary}}
                    />
                )}
            </Link>
        </motion.div>
    );
}