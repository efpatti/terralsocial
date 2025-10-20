import Infobar from "./Infobar";
import LogoHeader from "./LogoHeader";
import Navbar from "./Navbar";

const Header = () => {
 return (
  <header className="top-0 z-50 bg-white shadow-sm sticky">
   <Infobar />
   <LogoHeader />
   <Navbar />
  </header>
 );
};

export default Header;
