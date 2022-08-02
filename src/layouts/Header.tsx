import { IconCartOutline } from "components/icons";
import { path } from "constants/path";
import { Link } from "react-router-dom";
import { useStore } from "store/configStore";
import SearchBar from "./SearchBar";

const Header = () => {
  const { cart, currentUser } = useStore((state: any) => ({
    cart: state.carts,
    currentUser: state.currentUser,
  }));

  return (
    <header className='bg-orangeee4'>
      <div className='layout-container'>
        <div className='flex items-center justify-between text-white h-9'>
          <Link to={path.order}>Kiểm tra đơn hàng</Link>
          {!currentUser?.email && (
            <div className='flex gap-x-4'>
              <Link to={path.signUp}>Đăng kí</Link>
              <Link to={path.signIn}>Đăng nhập</Link>
            </div>
          )}
          {currentUser?.email && (
            <img
              src='https://avatars.githubusercontent.com/u/61537853?v=4'
              alt='user'
              className='w-6 h-6 rounded-full'
            />
          )}
        </div>
        <div className='flex items-center justify-between h-20 -ml-6 lg:ml-0 gap-x-6 '>
          <Link to={path.home}>
            <h1 className='hidden text-2xl font-medium text-white lg:block'>Shopbee</h1>
          </Link>
          <SearchBar />
          <Link to={path.cart} className='relative mr-5'>
            <IconCartOutline className='text-white' />
            <span className='absolute flex items-center justify-center w-6 h-4 bg-white rounded-full -top-2 -right-4 text-orangeee4'>
              {cart?.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
