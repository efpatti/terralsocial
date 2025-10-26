"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { items } from "@/data/items";
import { motion, AnimatePresence } from "framer-motion";
import { terralTheme } from "@/constants/theme";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { NavbarItem } from "@/types/navbar-item";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { X, Menu, Heart, HandHeart, ChevronDown } from "lucide-react";
import { VolunteerButton } from "@/components/header/navbar/volunteer-button";
import { DonateButton } from "@/components/header/navbar/donate-buttont";
import { MenuItemsContainer } from "@/components/header/navbar/menu-items-container";

const MobileHeader = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}) => (
  <div className="md:hidden flex items-center justify-between px-4 py-2">
    {/* left: Doar */}
    <div>
      <Link href="/doar">
        <Button
          size="sm"
          className="text-white text-xs font-semibold px-3 py-1.5 shadow-sm flex items-center gap-1.5"
          style={{ backgroundColor: terralTheme.colors.primary }}
        >
          <Heart size={14} fill="white" />
          <span>Doar</span>
        </Button>
      </Link>
    </div>

    {/* center: logo (smaller) */}
    <div className="flex-1 flex justify-center">
      <MobileMenuLogo />
    </div>

    {/* right: menu button */}
    <div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
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
  </div>
);

// Componente: Logo Mobile Menu
const MobileMenuLogo = () => (
  <div className="flex items-center gap-3">
    <div className="relative w-10 h-10">
      <Image
        src="/terral.png"
        alt="Logo TERRAL Social"
        fill
        className="w-full h-full object-contain drop-shadow-md"
        priority
      />
    </div>
    <div className="flex flex-col leading-none uppercase text-center">
      <span className="text-base font-semibold tracking-tight">Terral</span>
      <span className="text-xs font-medium text-gray-600 tracking-wide">Social</span>
    </div>
  </div>
);

// Componente: Mobile Menu Item
const MobileMenuItem = ({
  item,
  idx,
  expandedItems,
  toggleExpand,
  closeMenu,
  pathname,
}: {
  item: NavbarItem;
  idx: number;
  expandedItems: Record<string, boolean>;
  toggleExpand: (label: string) => void;
  closeMenu: () => void;
  pathname: string;
}) => {
  const hasSubitems = item.subitems && item.subitems.length > 0;
  const isExpanded = expandedItems[item.label];
  const isActive = item.href
    ? item.href === "/"
      ? pathname === "/"
      : pathname.startsWith(item.href)
    : item.subitems?.some((sub) => pathname.startsWith(sub.href));

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: idx * 0.05 }}
      className="mb-2"
    >
      {hasSubitems ? (
        <div>
          <button
            onClick={() => toggleExpand(item.label)}
            className="w-full px-3 py-2.5 rounded-lg font-medium text-sm relative transition-colors text-gray-900 bg-gray-50"
            style={isActive ? { color: terralTheme.colors.primary } : {}}
          >
            <div className="w-full flex items-center justify-center">
              <span className="text-center">{item.label}</span>
            </div>
            {isActive && (
              <div className="w-full flex justify-center">
                <span
                  className="block w-6 h-[2px] rounded mt-1"
                  style={{ backgroundColor: terralTheme.colors.primary }}
                />
              </div>
            )}
            <motion.div
              className="absolute right-3 top-1/2 -translate-y-1/2"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={16} />
            </motion.div>
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden mt-2"
              >
                <div className="bg-gradient-to-b from-gray-50 to-white rounded-lg p-2 space-y-1.5">
                  {item.subitems?.map((sub, subIdx) => {
                    const isSubActive = pathname.startsWith(sub.href);
                    return (
                      <motion.div
                        key={sub.href}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: subIdx * 0.05 }}
                      >
                        <Link
                          href={sub.href}
                          onClick={closeMenu}
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
        </div>
      ) : (
        <Link
          href={item.href || "#"}
          onClick={closeMenu}
          className="block px-3 py-2.5 rounded-lg font-medium text-sm text-center transition-colors text-gray-900 bg-gray-50"
          style={isActive ? { color: terralTheme.colors.primary } : {}}
        >
          {item.label}
          {isActive && (
            <span
              className="block w-6 h-[2px] rounded mx-auto mt-1"
              style={{ backgroundColor: terralTheme.colors.primary }}
            />
          )}
        </Link>
      )}
    </motion.div>
  );
};

// Componente: Mobile Menu Footer
const MobileMenuFooter = ({ closeMenu }: { closeMenu: () => void }) => (
  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-4 pb-4 px-4">
    <div className="space-y-2.5">
      <Link href="/voluntario" onClick={closeMenu}>
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

      <Link href="/como-ajudar/doe-agora" onClick={closeMenu}>
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

      <p className="text-center text-xs text-gray-400 mt-3 font-medium">Terral Social © 2025</p>
    </div>
  </div>
);

// Componente Principal
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const pathname = usePathname();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) => {
      const isOpenAlready = Boolean(prev[label]);
      if (isOpenAlready) return {};
      return { [label]: true };
    });
  };

  const closeMenu = () => {
    setIsOpen(false);
    setExpandedItems({});
  };

  return (
    <>
      <nav
        className={`shadow-sm relative z-50 bg-white transition-all duration-300 overflow-x-hidden ${
          isScrolled ? "shadow-lg py-2" : "shadow-top py-3"
        }`}
      >
        {!isMobile ? (
          <div className="hidden md:flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
            <VolunteerButton />
            <MenuItemsContainer />
            <DonateButton />
          </div>
        ) : (
          <MobileHeader isOpen={isOpen} setIsOpen={setIsOpen} />
        )}
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[100] md:hidden"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <MobileMenuLogo />
              <Button variant="ghost" size="icon" onClick={closeMenu} className="rounded-full">
                <X size={20} />
              </Button>
            </div>

            <div className="h-[calc(100vh-180px)] overflow-y-auto px-4 py-4">
              {items.map((item, idx) => (
                <MobileMenuItem
                  key={item.label}
                  item={item}
                  idx={idx}
                  expandedItems={expandedItems}
                  toggleExpand={toggleExpand}
                  closeMenu={closeMenu}
                  pathname={pathname ?? "/"}
                />
              ))}
            </div>

            <MobileMenuFooter closeMenu={closeMenu} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
