import { IconCart, IconSearch } from "components/icons";
import { path } from "constants/path";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className='bg-linearfef5'>
      <div className='layout-container'>
        <div className='flex justify-between items-center h-9 text-white'>
          <span>Kiểm tra đơn hàng</span>
          <div className='flex gap-x-4'>
            <span>Đăng kí</span>
            <span>Đăng nhập</span>
          </div>
        </div>
        <div className='h-20 flex items-center gap-x-5 lg:gap-x-14'>
          <Link to={path.home}>
            <h1 className='hidden lg:block font-medium text-2xl text-white'>Shopbee</h1>
          </Link>
          <form className='bg-white flex-1 flex justify-between items-center px-3 rounded'>
            <input
              type='text'
              className='h-10 text-sm outline-none flex-1'
              placeholder='Nhập để tìm kiếm sản phẩm'
            />
            <button type='submit' className='bg-orangeee h-[30px] px-5 text-white rounded'>
              <IconSearch />
            </button>
          </form>
          <button type='button'>
            <IconCart className='text-white' />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
