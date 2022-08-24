import { path } from "constants/path";
import { Link } from "react-router-dom";

interface LogoProps {
  to?: string;
  primary?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Logo = ({ to = path.home, className, children, primary }: LogoProps) => {
  return (
    <Link to={to}>
      <h1
        className={`text-2xl font-medium ${primary ? "text-orangeee4" : "text-white"} ${className}`}
      >
        {children}
      </h1>
    </Link>
  );
};

Logo.defaultProps = {
  to: path.home,
  primary: false,
  className: "",
};

export default Logo;
