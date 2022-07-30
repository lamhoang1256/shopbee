interface OrderStatusBarProps {
  widthActive: number;
}

const OrderStatusBar = ({ widthActive }: OrderStatusBarProps) => {
  return (
    <>
      <div className='hidden md:block absolute top-[28px] w-3/4 left-1/2 -translate-x-1/2 h-1 bg-[#dbdbdb]' />
      <div
        style={{ width: `${widthActive}%` }}
        className='hidden md:block  absolute z-10 top-[28px] left-1/2 -translate-x-1/2 h-1 bg-[#2dc258]'
      />
    </>
  );
};

export default OrderStatusBar;
