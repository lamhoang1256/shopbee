import classNames from "utils/className";
import { formatMoney } from "utils/helper";

interface ProductPriceSaleProps {
  children: number;
  className?: string;
}

const ProductPriceSale = ({ children, className }: ProductPriceSaleProps) => {
  return <span className={classNames("text-redff4 ", className)}>{formatMoney(children)}</span>;
};

ProductPriceSale.defaultProps = {
  className: "font-medium lg:text-base",
};

export default ProductPriceSale;
