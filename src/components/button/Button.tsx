/* eslint-disable react/button-has-type */
import { ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import classNames from "utils/className";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  primary?: boolean;
  to?: string;
}

const Button = ({ children, type, className, primary, to, ...props }: ButtonProps) => {
  const stylesButton = primary
    ? "py-2 px-4 rounded-sm border border-transparent text-white bg-orangeee4"
    : "py-2 rounded-sm px-4 border border-[#00000017]";
  if (to) {
    return (
      <Link to={to}>
        <button type={type} {...props} className={classNames(stylesButton, className)}>
          {children}
        </button>
      </Link>
    );
  }
  return (
    <button type={type} {...props} className={classNames(stylesButton, className)}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: "",
  primary: false,
  to: "",
};

export default Button;
