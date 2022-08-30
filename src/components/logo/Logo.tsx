import { PATH } from "constants/path";
import { Link } from "react-router-dom";

interface LogoProps {
  to?: string;
  primary?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Logo = ({ to = PATH.home, className, children, primary }: LogoProps) => {
  return (
    <Link to={to} className={className}>
      <h1 className={`text-2xl font-medium ${primary ? "text-orangeee4" : "text-white"} $`}>
        {children}
      </h1>
    </Link>
  );
};

Logo.defaultProps = {
  to: PATH.home,
  primary: false,
  className: "",
};

export default Logo;
