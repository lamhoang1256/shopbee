import { IconCart, IconSearch } from "components/icons";
import { path } from "constants/path";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className='bg-blue1a'>
      <div className='layout-container'>
        <div className='flex items-center justify-between text-white h-9'>
          <span>Kiểm tra đơn hàng</span>
          <div className='flex gap-x-4'>
            <span>Đăng kí</span>
            <span>Đăng nhập</span>
          </div>
        </div>
        <div className='flex items-center h-20 gap-x-5 lg:gap-x-14'>
          <Link to={path.home}>
            <h1 className='hidden text-2xl font-medium text-white lg:block'>Shopbee</h1>
          </Link>
          <form className='flex items-center justify-between flex-1 px-3 bg-white rounded'>
            <input
              type='text'
              className='flex-1 text-sm outline-none h-11'
              placeholder='Nhập để tìm kiếm sản phẩm'
            />
            <button type='submit' className='bg-[#0d5cb6] h-[30px] px-5 text-white rounded'>
              <IconSearch />
            </button>
          </form>
          <Link to={path.cart}>
            <IconCart className='text-white' />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
