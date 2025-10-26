"use client";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useNavbarState } from "@/hooks/use-navbar-state";
import { DesktopNavbar } from "./desktop-navbar";
import { MobileNavbar } from "./mobile-navbar";

export default function Navbar() {
    const isMobile = useIsMobile();
    const {
        isOpen,
        setIsOpen,
        isScrolled,
        expandedItems,
        toggleExpand,
        closeMenu,
    } = useNavbarState();

    return (
        <nav
            className={`shadow-sm relative z-50 bg-white transition-all duration-300 overflow-x-hidden ${
                isScrolled ? "shadow-lg py-2" : "shadow-top py-3"
            }`}
        >
            {!isMobile ? (
                <DesktopNavbar />
            ) : (
                <MobileNavbar
                    isOpen={isOpen}
                    expandedItems={expandedItems}
                    onToggle={() => setIsOpen(!isOpen)}
                    onToggleItem={toggleExpand}
                    onClose={closeMenu}
                />
            )}
        </nav>
    );
}