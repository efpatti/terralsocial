"use client";
import { useState, useEffect } from "react";
import Infobar from "./Infobar";
import LogoHeader from "./LogoHeader";
import Navbar from "./Navbar";
// Hook para detectar mobile
const useIsMobile = (): boolean => {
 const [isMobile, setIsMobile] = useState(false);

 useEffect(() => {
  const checkMobile = () => {
   setIsMobile(window.innerWidth < 768);
  };

  checkMobile();
  window.addEventListener("resize", checkMobile);
  return () => window.removeEventListener("resize", checkMobile);
 }, []);

 return isMobile;
};

const Header = () => {
 const isMobile = useIsMobile();

 return (
  <header className="top-0 z-50 bg-white shadow-sm sticky">
   <Infobar />
   {!isMobile && <LogoHeader />}
   <Navbar />
  </header>
 );
};

export default Header;
