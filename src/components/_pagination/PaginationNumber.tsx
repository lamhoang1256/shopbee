import { ButtonHTMLAttributes } from "react";
import classNames from "utils/classNames";

interface ButtonPageProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean;
}

const ButtonPage = ({ children, className = "", active, ...props }: ButtonPageProps) => {
  if (active)
    return (
      <button
        type="button"
        className={classNames(
          "text-lg font-medium text-white rounded-sm w-9 h-7 bg-orangeee4",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  return (
    <button type="button" className={classNames("text-lg font-medium w-9 h-7")} {...props}>
      {children}
    </button>
  );
};

export default ButtonPage;
