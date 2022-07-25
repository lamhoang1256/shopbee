import classNames from "utils/className";

interface ProductPriceOldProps {
  children: React.ReactNode;
  className?: string;
}

const ProductPriceOld = ({ children, className }: ProductPriceOldProps) => {
  return <span className={classNames("line-through", className)}>{children}</span>;
};

ProductPriceOld.defaultProps = {
  className: "text-[#666]",
};

export default ProductPriceOld;
