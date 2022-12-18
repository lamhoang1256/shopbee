import { ButtonHTMLAttributes } from "react";
import classNames from "utils/classNames";

interface PaginationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
}

const stylesNormal =
  "h-9 w-10 flex items-center justify-center border border-black017 bg-[#fff] cursor-pointer disabled:cursor-not-allowed";
const stylesActive =
  "h-9 flex items-center justify-center w-10 border bg-[#f9f9f9] border-black017 opacity-70 disabled:cursor-not-allowed";

const PaginationButton = ({
  children,
  className,
  primary = false,
  ...props
}: PaginationButtonProps) => {
  if (primary) {
    return (
      <button type="button" className={classNames(stylesNormal, className)} {...props}>
        {children}
      </button>
    );
  }
  return (
    <button disabled type="button" className={classNames(stylesActive, className)} {...props}>
      {children}
    </button>
  );
};

export default PaginationButton;
