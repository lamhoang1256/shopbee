interface ProductPriceOldProps {
  children: React.ReactNode;
}

const ProductPriceOld = ({ children }: ProductPriceOldProps) => {
  return <span className='text-[13px] line-through text-[#666]'>{children}</span>;
};

export default ProductPriceOld;
