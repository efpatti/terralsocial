"use client";
import InfoBar from "./info-bar";
import LogoHeader from "./logo-header";
import Navbar from "./navbar";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useNavbarState } from "@/hooks/use-navbar-state";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const isMobile = useIsMobile();
  const { isScrolled } = useNavbarState();

  if (isMobile) {
    return (
      <header className="top-0 z-50 bg-white shadow-sm sticky">
        <Navbar />
      </header>
    );
  }

  return (
    <header className="top-0 z-50 bg-white shadow-sm sticky">
      <AnimatePresence mode="wait">
        {!isScrolled && (
          <motion.div
            key="header-content"
            initial={{ opacity: 0, y: -32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: -32,
              transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
            }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              willChange: "transform, opacity",
            }}
          >
            <InfoBar />
            <LogoHeader />
          </motion.div>
        )}
      </AnimatePresence>
      <Navbar />
    </header>
  );
};

export default Header;
