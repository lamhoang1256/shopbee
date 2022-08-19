const OrderEmpty = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-2 bg-white h-[400px] mt-3'>
      <img src='/images/order-empty.png' alt='order' className='w-28 h-28' />
      <h3>Chưa có đơn hàng</h3>
    </div>
  );
};

export default OrderEmpty;