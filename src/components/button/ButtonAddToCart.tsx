import { IconCartOutline } from "components/icons";

const ButtonAddToCart = () => {
  return (
    <button
      type='button'
      className='flex justify-center font-semibold items-center w-[300px] h-12 mt-5 text-white gap-x-2 bg-redff4 rounded'
    >
      <IconCartOutline />
      <span className='text-sm'>Thêm vào giỏ hàng</span>
    </button>
  );
};

export default ButtonAddToCart;
