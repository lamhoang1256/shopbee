import classNames from "utils/className";

interface ButtonAddToCartProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const ButtonAddToCart = ({ children, className, onClick }: ButtonAddToCartProps) => {
  return (
    <button
      type='button'
      className={classNames(
        "flex justify-center px-3 items-center border border-orangeee4 text-orangeee4 bg-[#ff57221a] rounded-sm",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

ButtonAddToCart.defaultProps = {
  className: "h-12",
  onClick: () => {},
};

export default ButtonAddToCart;
