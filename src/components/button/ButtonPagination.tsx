import { ButtonHTMLAttributes } from "react";
import classNames from "utils/className";

interface ButtonPaginationProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
}

const stylesNormal =
  "h-9 w-10 flex items-center justify-center border border-[#00000017] bg-[#fff] cursor-pointer";
const stylesActive =
  "h-9 flex items-center justify-center w-10 border bg-[#f9f9f9] border-[#00000017] opacity-70";

const ButtonPagination = ({
  children,
  className = "",
  primary,
  ...props
}: ButtonPaginationProps) => {
  if (primary) {
    return (
      <button type='button' className={classNames(stylesNormal, className)} {...props}>
        {children}
      </button>
    );
  }
  return (
    <button disabled type='button' className={classNames(stylesActive, className)} {...props}>
      {children}
    </button>
  );
};

ButtonPagination.defaultProps = {
  primary: false,
};

export default ButtonPagination;
