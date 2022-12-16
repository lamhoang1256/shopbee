import classNames from "utils/classNames";
import { formatMoney } from "utils/helper";

interface ProductPriceSaleProps {
  children: number;
  className?: string;
}

const ProductPriceSale = ({
  children,
  className = "font-medium lg:text-base"
}: ProductPriceSaleProps) => {
  return <span className={classNames("text-redff4", className)}>{formatMoney(children)}</span>;
};

export default ProductPriceSale;
