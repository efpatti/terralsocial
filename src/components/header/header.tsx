"use client";
import Index from "./info-bar";
import LogoHeader from "./logo-header";
import Navbar from "./navbar";
import { useIsMobile } from "@/hooks/use-is-mobile";

const Header = () => {
  const isMobile = useIsMobile();

  return (
    <header className="top-0 z-50 bg-white shadow-sm sticky">
      <Index />
      {!isMobile && <LogoHeader />}
      <Navbar />
    </header>
  );
};

export default Header;
