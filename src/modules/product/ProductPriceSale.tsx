import classNames from "utils/className";

interface ProductPriceSaleProps {
  children: React.ReactNode;
  className?: string;
}

const ProductPriceSale = ({ children, className }: ProductPriceSaleProps) => {
  return <span className={classNames("text-orangeee", className)}>{children}</span>;
};

ProductPriceSale.defaultProps = {
  className: "text-[15px]",
};

export default ProductPriceSale;
