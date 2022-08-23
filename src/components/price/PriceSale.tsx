import classNames from "utils/className";
import { formatMoney } from "utils/helper";

interface PriceSaleProps {
  children: number;
  className?: string;
}

const PriceSale = ({ children, className }: PriceSaleProps) => {
  return <span className={classNames("text-redff4 ", className)}>{formatMoney(children)}</span>;
};

PriceSale.defaultProps = {
  className: "font-medium lg:text-base",
};

export default PriceSale;
