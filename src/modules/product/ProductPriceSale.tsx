interface ProductPriceSaleProps {
  children: React.ReactNode;
}

const ProductPriceSale = ({ children }: ProductPriceSaleProps) => {
  return <span className='text-[15px] text-orangeee'>{children}</span>;
};

export default ProductPriceSale;
