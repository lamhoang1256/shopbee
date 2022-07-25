import { IconCartOutline } from "components/icons";

const ButtonAddToCart = () => {
  return (
    <button
      type='button'
      className='mt-5 flex items-center gap-x-2 text-orangeee bg-[#ff57221a] border border-orangeee h-12 px-4 hover:bg-[#ff572226] transition-all duration-300 rounded-sm'
    >
      <IconCartOutline />
      <span className='text-sm'>Thêm vào giỏ hàng</span>
    </button>
  );
};

export default ButtonAddToCart;
