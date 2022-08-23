import classNames from "utils/className";
import { formatMoney } from "utils/helper";

interface PriceOldProps {
  children: number;
  className?: string;
}

const PriceOld = ({ children, className }: PriceOldProps) => {
  return <span className={classNames("line-through", className)}>{formatMoney(children)}</span>;
};

PriceOld.defaultProps = {
  className: "text-[#666]",
};

export default PriceOld;
