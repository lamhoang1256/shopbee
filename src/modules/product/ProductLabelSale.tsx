interface ProductLabelSaleProps {
  children: React.ReactNode;
}

const ProductLabelSale = ({ children }: ProductLabelSaleProps) => {
  return (
    <span className='text-xs text-white bg-orangeee font-semibold px-1 rounded py-[2px]'>
      {children}
    </span>
  );
};

export default ProductLabelSale;
