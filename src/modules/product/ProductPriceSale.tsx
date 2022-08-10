import classNames from "utils/className";

interface ProductPriceSaleProps {
  children: React.ReactNode;
  className?: string;
}

const ProductPriceSale = ({ children, className }: ProductPriceSaleProps) => {
  return <span className={classNames("text-redff4 ", className)}>{children}</span>;
};

ProductPriceSale.defaultProps = {
  className: "font-medium lg:text-base",
};

export default ProductPriceSale;
