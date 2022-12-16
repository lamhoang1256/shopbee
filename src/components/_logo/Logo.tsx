import { PATH } from "constants/path";
import { Link } from "react-router-dom";
import classNames from "utils/classNames";

interface LogoProps {
  to?: string;
  primary?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Logo = ({ to = PATH.home, className, children, primary }: LogoProps) => {
  const stylePrimary = primary ? "text-orangeee4" : "text-white";
  return (
    <Link to={to} className={className}>
      <h1 className={classNames(`text-2xl font-medium`, stylePrimary, className)}>{children}</h1>
    </Link>
  );
};

Logo.defaultProps = {
  to: PATH.home,
  primary: false,
  className: ""
};

export default Logo;
