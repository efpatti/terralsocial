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
      <AnimatePresence initial={false}>
        {!isScrolled && (
          <motion.div
            key="header-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{
              height: 0,
              opacity: 0,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
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
