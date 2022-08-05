import { IconCartOutline } from "components/icons";
import { defaultUserAvatar } from "constants/global";
import { path } from "constants/path";
import { Link } from "react-router-dom";
import { useStore } from "store/configStore";
import SearchBar from "./SearchBar";

const Header = () => {
  const { carts, currentUser } = useStore((state) => state);
  return (
    <header className='bg-orangeee4'>
      <div className='layout-container'>
        <div className='flex items-center justify-between h-12 text-white'>
          <Link to={path.order}>Kiểm tra đơn hàng</Link>
          {!currentUser?.email && (
            <div className='flex gap-x-4'>
              <Link to={path.signUp}>Đăng kí</Link>
              <Link to={path.signIn}>Đăng nhập</Link>
            </div>
          )}
          {currentUser?.email && (
            <div className='flex items-center gap-x-2'>
              <img
                src={defaultUserAvatar}
                alt='avatar'
                className='object-cover w-5 h-5 rounded-full'
              />
              <span className='font-medium'>{currentUser?.fullname}</span>
            </div>
          )}
        </div>
        <div className='flex items-center justify-between h-20 -ml-3 lg:ml-0 gap-x-3 md:gap-x-6 '>
          <Link to={path.home} className='w-36'>
            <h1 className='hidden text-2xl font-medium text-white lg:block'>Shopbee</h1>
          </Link>
          <SearchBar />
          <Link to={path.cart} className='relative mr-4 lg:mr-8'>
            <IconCartOutline className='text-white' />
            <span className='absolute flex items-center justify-center w-6 h-[18px] text-xs font-medium bg-white rounded-full -top-3 -right-3 text-orangeee4'>
              {carts?.length >= 99 ? 99 : carts.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
