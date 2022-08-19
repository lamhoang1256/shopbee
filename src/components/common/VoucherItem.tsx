const VoucherItem = () => {
  return (
    <div className='flex my-4 overflow-hidden rounded-md gap-x-5 shadow1'>
      <img
        src='/images/voucher.png'
        className='w-[70px] h-[70px] md:w-24 md:h-24 bg-orangeee4'
        alt='voucher'
      />
      <div className='flex flex-col justify-center'>
        <h3 className='text-base'>Giảm giá 200K</h3>
        <span>HSD: 22.08.2022</span>
      </div>
    </div>
  );
};

export default VoucherItem;
