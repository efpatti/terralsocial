import Infobar from "./Infobar";
import LogoHeader from "./LogoHeader";
import Navbar from "./Navbar";

const Header = () => {
 return (
  <header className="sticky top-0 z-50">
   <Infobar />
   <LogoHeader />
   <Navbar />
  </header>
 );
};

export default Header;
