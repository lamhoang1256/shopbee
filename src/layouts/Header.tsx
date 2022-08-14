import { path } from "constants/path";
import { Link } from "react-router-dom";
import HeaderCart from "./HeaderCart";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <header className='bg-orangeee4'>
      <div className='layout-container'>
        <Navbar />
        <div className='flex items-center justify-between h-20 lg:ml-0 md:gap-x-6'>
          <Link to={path.home} className='hidden w-0 md:block md:w-36'>
            <h1 className='text-2xl font-medium text-white'>Shopbee</h1>
          </Link>
          <SearchBar />
          <HeaderCart />
        </div>
      </div>
    </header>
  );
};

export default Header;
