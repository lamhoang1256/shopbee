interface ProductLabelSaleProps {
  children: React.ReactNode;
}

const ProductLabelSale = ({ children }: ProductLabelSaleProps) => {
  return (
    <div className='text-xs w-11 rounded-sm px-1 py-[2px] text-redff4 bg-[#fff0f1] border border-redff4'>
      {children}
    </div>
  );
};

export default ProductLabelSale;
