interface ProductSaleBarProps {
  children: React.ReactNode;
  percent: number;
}

const ProductSaleBar = ({ children, percent = 10 }: ProductSaleBarProps) => {
  console.log("percent: ", percent);
  return (
    <div className='mt-3 relative bg-[#ffaaaf] h-5 w-full rounded-[10px] text-white text-center text-[11px] leading-5'>
      <img
        src='https://frontend.tikicdn.com/_desktop-next/static/img/fire_icon.svg'
        alt='fire'
        className='absolute z-30 w-5 h-5 left-2 -top-1'
      />
      <div
        style={{ width: `${percent}%` }}
        className='absolute top-0 left-0 z-10 h-full bg-redff4 rounded-[10px]'
      />
      <span className='relative z-20'>{children}</span>
    </div>
  );
};

export default ProductSaleBar;
