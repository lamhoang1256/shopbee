/* eslint-disable react/button-has-type */
import { ButtonHTMLAttributes } from "react";
import classNames from "utils/className";

interface ButtonPaginationProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  primary?: boolean;
}

const ButtonPagination = ({
  children,
  type,
  className,
  primary,
  ...props
}: ButtonPaginationProps) => {
  if (primary) {
    return (
      <button
        type={type}
        {...props}
        className={classNames(
          "h-9 w-10 flex items-center justify-center border border-[#00000017] bg-[#fff] cursor-pointer",
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
      disabled
      className={classNames(
        "h-9 flex items-center justify-center w-10 border bg-[#f9f9f9] border-[#00000017] opacity-70",
        className,
      )}
    >
      {children}
    </button>
  );
};

ButtonPagination.defaultProps = {
  className: "",
  primary: false,
};

export default ButtonPagination;
