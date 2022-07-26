import classNames from "utils/className";

interface ProductPriceSaleProps {
  children: React.ReactNode;
  className?: string;
}

const ProductPriceSale = ({ children, className }: ProductPriceSaleProps) => {
  return <span className={classNames("text-redff4 font-medium", className)}>{children}</span>;
};

ProductPriceSale.defaultProps = {
  className: "",
};

export default ProductPriceSale;
