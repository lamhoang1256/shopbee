interface ProductSoldProps {
  children: React.ReactNode;
  className?: string;
}

const ProductSold = ({ children, className }: ProductSoldProps) => {
  return (
    <div className={className}>
      {children}
      <span className='pl-3 text-[#767676] text-sm'>Đã bán</span>
    </div>
  );
};

ProductSold.defaultProps = {
  className: "",
};

export default ProductSold;
