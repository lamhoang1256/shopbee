import { Logo } from "components/logo";
import HeaderCart from "./HeaderCart";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <header className='bg-linearOrange'>
      <div className='layout-container'>
        <Navbar />
        <div className='flex items-center justify-between h-20 lg:ml-0 md:gap-x-6'>
          <Logo>Shopbee</Logo>
          <SearchBar />
          <HeaderCart />
        </div>
      </div>
    </header>
  );
};

export default Header;
