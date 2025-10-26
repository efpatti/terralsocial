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

    return (
        <header className="top-0 z-50 bg-white shadow-sm sticky">
            {!isMobile && (
                <>
                    <AnimatePresence>
                        {!isScrolled && (
                            <motion.div
                                initial={{ height: "auto", opacity: 1 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                    duration: 0.3,
                                    ease: [0.25, 0.1, 0.25, 1]
                                }}
                                style={{ overflow: "hidden" }}
                            >
                                <InfoBar />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {!isScrolled && (
                            <motion.div
                                initial={{ height: "auto", opacity: 1 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                    duration: 0.3,
                                    ease: [0.25, 0.1, 0.25, 1],
                                    delay: 0.05
                                }}
                                style={{ overflow: "hidden" }}
                            >
                                <LogoHeader />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}
            <Navbar />
        </header>
    );
};

export default Header;
