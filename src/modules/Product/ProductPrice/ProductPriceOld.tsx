import classNames from "utils/classNames";
import { formatMoney } from "utils/helper";

interface ProductPriceOldProps {
  children: number;
  className?: string;
}

const ProductPriceOld = ({ children, className }: ProductPriceOldProps) => {
  return <span className={classNames("line-through", className)}>{formatMoney(children)}</span>;
};

ProductPriceOld.defaultProps = {
  className: "text-[#666]"
};

export default ProductPriceOld;
