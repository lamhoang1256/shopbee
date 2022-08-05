/* eslint-disable react/button-has-type */
import { ButtonHTMLAttributes } from "react";
import classNames from "utils/className";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  primary?: boolean;
}

const Button = ({ children, type, className, primary, ...props }: ButtonProps) => {
  if (primary) {
    return (
      <button
        type={type}
        {...props}
        className={classNames(
          "py-2 px-4 rounded-sm border border-transparent text-white bg-orangeee4",
          className,
        )}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      type={type}
      {...props}
      className={classNames("py-2 rounded-sm px-4 border border-[#00000017]", className)}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: "",
  primary: false,
};

export default Button;
