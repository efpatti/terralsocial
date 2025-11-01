"use client";
import { motion } from "framer-motion";
import { MenuItemsContainer } from "./menu-items-container";
import { VolunteerButton } from "./volunteer-button";
import { DonateButton } from "./donate-button";
import { NavbarLogo } from "./navbar-logo";
import { useNavbarState } from "@/hooks/use-navbar-state";

export function DesktopNavbar() {
 const { isScrolled } = useNavbarState();

 return (
  <div className="hidden md:flex items-center px-6 py-4 max-w-7xl mx-auto transition-all duration-300">
   {/* Logo - sempre presente, mas animado. Avoid animating width to prevent layout shifts that can trigger scroll events in a loop. */}
   <motion.div
    // prevent initial mount animation replay on re-renders
    initial={false}
    animate={{
     opacity: isScrolled ? 1 : 0,
     scale: isScrolled ? 1 : 0.95,
     x: isScrolled ? 0 : -12,
     // do NOT animate width here (causes layout reflow)
    }}
    transition={{
     type: "spring",
     stiffness: 300,
     damping: 25,
    }}
    // reserve space so the collapse doesn't change layout height/width
    className="mr-8 w-[140px] overflow-hidden"
   >
    <NavbarLogo />
   </motion.div>

   {/* Resto do código permanece igual */}
   <div className="flex-1 flex justify-center">
    <MenuItemsContainer />
   </div>

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
