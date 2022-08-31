import { ButtonHTMLAttributes } from "react";
import classNames from "utils/className";

interface ButtonOutlineProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
}

const ButtonOutline = ({
  children,
  primary,
  className = "",
  onClick,
  ...props
}: ButtonOutlineProps) => {
  const stylesButton = primary
    ? "border-orangeee4 text-orangeee4 bg-[#ff57221a] hover:bg-[#ffc5b22e]"
    : "border-[#00000016] hover:bg-[#00000005] text-[#555] shadow-button-normal";
  return (
    <button
      type='button'
      onClick={onClick}
      className={classNames(
        "py-2 px-4 border rounded-sm transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60",
        stylesButton,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

ButtonOutline.defaultProps = {
  primary: false,
};

export default ButtonOutline;
