import { ButtonHTMLAttributes } from "react";

interface ButtonPageProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean;
}

const ButtonPage = ({ children, active, ...props }: ButtonPageProps) => {
  if (active)
    return (
      <button
        type="button"
        className="text-lg font-medium text-white rounded-sm w-9 h-7 bg-orangeee4"
        {...props}
      >
        {children}
      </button>
    );
  return (
    <button type="button" className="text-lg font-medium w-9 h-7" {...props}>
      {children}
    </button>
  );
};

export default ButtonPage;
