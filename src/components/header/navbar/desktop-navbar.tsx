"use client";
import { motion, AnimatePresence } from "framer-motion";
import { MenuItemsContainer } from "./menu-items-container";
import { VolunteerButton } from "./volunteer-button";
import { DonateButton } from "./donate-button";
import { NavbarLogo } from "./navbar-logo";
import { useNavbarState } from "@/hooks/use-navbar-state";

export function DesktopNavbar() {
    const { isScrolled } = useNavbarState();

    return (
        <div className="hidden md:flex items-center px-6 py-4 max-w-7xl mx-auto transition-all duration-300">
            {/* Logo (aparece quando scrolled) */}
            <AnimatePresence mode="wait">
                {isScrolled && (
                    <motion.div
                        initial={{ opacity: 0, x: -20, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -20, scale: 0.8 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                        }}
                        className="mr-8"
                    >
                        <NavbarLogo />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Menu Items (centro) */}
            <div className="flex-1 flex justify-center">
                <MenuItemsContainer />
            </div>

            {/* Botões de ação (direita) */}
            <motion.div
                layout
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="flex items-center gap-3"
            >
                <VolunteerButton />
                <DonateButton />
            </motion.div>
        </div>
    );
}