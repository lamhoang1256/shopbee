import { ButtonHTMLAttributes } from "react";
import classNames from "utils/className";

interface ButtonOutlineProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonOutline = ({ children, className, onClick }: ButtonOutlineProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={classNames(
        "flex justify-center px-3 items-center border border-orangeee4 text-orangeee4 bg-[#ff57221a] rounded-sm",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default ButtonOutline;
