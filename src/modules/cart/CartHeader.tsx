const CartHeader = () => {
  return (
    <div className='hidden py-3 mt-8 bg-white lg:block px-9'>
      <div className='flex text-center'>
        <span className='w-20'>Hình ảnh</span>
        <span className='w-[40%]'>Sản phẩm</span>
        <span className='w-[25%]'>Đơn giá</span>
        <span className='w-[25%]'>Thao tác</span>
      </div>
    </div>
  );
};

export default CartHeader;
