interface ProductNameProps {
  children: React.ReactNode;
}

const ProductName = ({ children }: ProductNameProps) => {
  return <h3 className='text-[13px] text-black33 line-clamp-2'>{children}</h3>;
};

export default ProductName;
