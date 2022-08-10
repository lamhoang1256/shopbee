import { Link } from "react-router-dom";

interface ProductTitleProps {
  children: React.ReactNode;
  className?: string;
  styleLink?: string;
  to?: string;
}

const ProductTitle = ({ children, className, styleLink, to }: ProductTitleProps) => {
  if (to) {
    return (
      <Link to={to} className={styleLink}>
        <h3 className={className}>{children}</h3>
      </Link>
    );
  }
  return <h3 className={className}>{children}</h3>;
};

ProductTitle.defaultProps = {
  className: "text-[13px] text-black33 line-clamp-2",
  to: "",
  styleLink: "",
};

export default ProductTitle;
