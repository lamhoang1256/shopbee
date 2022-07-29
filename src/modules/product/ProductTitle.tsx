import { Link } from "react-router-dom";

interface ProductTitleProps {
  children: React.ReactNode;
  className?: string;
  to?: string;
}

const ProductTitle = ({ children, className, to }: ProductTitleProps) => {
  if (to) {
    return (
      <Link to={to}>
        <h3 className={className}>{children}</h3>
      </Link>
    );
  }
  return <h3 className={className}>{children}</h3>;
};

ProductTitle.defaultProps = {
  className: "text-[13px] text-black33 line-clamp-2",
  to: "",
};

export default ProductTitle;
