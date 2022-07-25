interface ProductTitleProps {
  children: React.ReactNode;
  className?: string;
}

const ProductTitle = ({ children, className }: ProductTitleProps) => {
  return <h3 className={className}>{children}</h3>;
};

ProductTitle.defaultProps = {
  className: "text-[13px] text-black33 line-clamp-2",
};

export default ProductTitle;
