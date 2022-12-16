import { Link } from "react-router-dom";

interface ProductTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  to?: string;
  styleLink?: string;
}

const ProductTitle = ({
  to,
  children,
  styleLink,
  className = "text-sm text-black33 line-clamp-2"
}: ProductTitleProps) => {
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
  to: "",
  styleLink: ""
};

export default ProductTitle;
