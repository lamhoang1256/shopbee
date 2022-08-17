import { Link } from "react-router-dom";
import { path } from "constants/path";

const CartEmpty = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-y-1 h-[400px]'>
      <img src='/images/cart-empty.png' alt='empty cart' className='w-28 h-28' />
      <h3 className='font-medium text-base text-[#00000066]'>Giỏ hàng của bạn còn trống</h3>
      <Link to={path.home}>
        <button type='button' className='py-2 mt-2 text-white rounded px-9 bg-orangeee4'>
          MUA NGAY
        </button>
      </Link>
    </div>
  );
};

export default CartEmpty;
