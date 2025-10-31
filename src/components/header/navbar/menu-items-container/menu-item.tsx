"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { terralTheme } from "@/constants/theme";
import { MenuItemConfig } from "@/types/menu-item-config";
import Portal from "@/components/ui/portal";

export const MenuItem = ({ item, onClick, mobile = false, subitem = false }: MenuItemConfig) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Check if current item or any subitem is active
  const isActive = useMemo(() => {
    if (item.href) {
      // Exact match for home, starts with for others
      if (item.href === "/") {
        return pathname === "/";
      }
      return pathname.startsWith(item.href);
    }

    // Check if any subitem is active
    if (item.subitems) {
      return item.subitems.some((sub) => pathname.startsWith(sub.href));
    }

    return false;
  }, [pathname, item]);

  // Portal positioning helpers (declare hooks at top-level to follow Rules of Hooks)
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [coords, setCoords] = useState<{ left: number; top: number } | null>(null);

  const updateCoords = () => {
    const el = buttonRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setCoords({ left: rect.left, top: rect.bottom });
  };

  useEffect(() => {
    if (!isOpen) return;
    updateCoords();
    const onScroll = () => updateCoords();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", updateCoords);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", updateCoords);
    };
  }, [isOpen]);

  // Mobile version - simplified
  if (mobile) {
    if (subitem) {
      const isSubActive = pathname.startsWith(item.href || "");
      return (
        <Link
          href={item.href || "#"}
          onClick={onClick}
          className={`block pl-8 pr-4 py-3 text-base font-medium transition-all duration-200 rounded-lg mx-2 ${
            isSubActive
              ? "bg-green-50 text-[#499D4B] font-semibold border-l-4"
              : "text-gray-700 hover:bg-green-50 hover:text-[#499D4B]"
          }`}
          style={
            isSubActive
              ? {
                  borderColor: terralTheme.colors.primary,
                  backgroundColor: `${terralTheme.colors.primary}10`,
                }
              : {}
          }
        >
          <div className="flex items-center gap-3">
            <ChevronRight size={16} className="text-gray-400" />
            {item.label}
          </div>
        </Link>
      );
    }

    return (
      <Link
        href={item.href || "#"}
        onClick={onClick}
        className={`block px-4 py-4 text-lg font-semibold transition-all duration-200 rounded-xl mx-2 ${
          isActive ? "text-white shadow-lg" : "text-gray-900 hover:bg-gray-50"
        }`}
        style={
          isActive
            ? {
                backgroundColor: terralTheme.colors.primary,
              }
            : {}
        }
      >
        <div className="flex items-center justify-between">
          {item.label}
          {isActive && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-2 h-2 bg-white rounded-full"
            />
          )}
        </div>
      </Link>
    );
  }

  // Desktop version (original)
  if (item.subitems && item.subitems.length > 0) {
    return (
      <div
        className="relative"
        onMouseEnter={() => {
          setIsOpen(true);
          updateCoords();
        }}
        onMouseLeave={() => setIsOpen(false)}
      >
        <button
          ref={buttonRef}
          className={`flex items-center gap-1 font-semibold transition-all duration-200 px-4 py-2 rounded-md hover:bg-green-50 relative ${
            isActive ? "text-[#499D4B]" : "text-gray-700 hover:text-[#499D4B]"
          }`}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {item.label}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
          {isActive && (
            <motion.div
              layoutId="navbar-active-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#499D4B]"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </button>

        <AnimatePresence>
          {isOpen && (
            <Portal>
              <motion.div
                className="z-[9999] w-56 bg-white shadow-xl rounded-lg overflow-hidden border-2"
                style={{
                  borderColor: terralTheme.colors.primary,
                  position: "fixed",
                  left: coords?.left ?? 0,
                  top: coords?.top ?? 0,
                }}
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="py-2">
                  {item.subitems.map((sub, idx) => {
                    const isSubActive = pathname.startsWith(sub.href);
                    return (
                      <motion.div
                        key={sub.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.2,
                          delay: idx * 0.03,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                      >
                        <Link
                          href={sub.href}
                          onClick={() => {
                            onClick?.();
                            setIsOpen(false);
                          }}
                          className={`block px-4 py-3 text-sm font-medium transition-all duration-200 ${
                            isSubActive
                              ? "bg-green-50 text-[#499D4B] font-bold pl-6 border-l-4"
                              : "text-gray-700 hover:bg-green-50 hover:text-[#499D4B] hover:pl-6"
                          }`}
                          style={isSubActive ? { borderColor: terralTheme.colors.primary } : {}}
                        >
                          {sub.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </Portal>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Link
      href={item.href || "#"}
      onClick={onClick}
      className={`block font-semibold transition-all duration-200 px-4 py-2 rounded-md hover:bg-green-50 relative ${
        isActive ? "text-[#499D4B]" : "text-gray-700 hover:text-[#499D4B]"
      }`}
    >
      {item.label}
      {isActive && (
        <motion.div
          layoutId="navbar-active-indicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#499D4B]"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
};
