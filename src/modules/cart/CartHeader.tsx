import { CheckBox } from "components/checkbox";

const CartHeader = () => {
  return (
    <div className='py-3 mt-8 bg-white px-9'>
      <div className='flex justify-between text-center'>
        <div className='w-[5%]'>
          <CheckBox />
        </div>
        <span className='text-sm w-[40%]'>Sản phẩm</span>
        <span className='text-sm w-[20%]'>Đơn giá</span>
        <span className='text-sm w-[15%]'>Số lượng</span>
        <span className='text-sm w-[10%]'>Số tiền</span>
        <span className='text-sm w-[10%]'>Thao tác</span>
      </div>
    </div>
  );
};

export default CartHeader;
