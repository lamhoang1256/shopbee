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
        "flex justify-center font-semibold items-center text-white bg-redff4 rounded",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

ButtonAddToCart.defaultProps = {
  className: "w-[210px] h-[40px]",
  onClick: () => {},
};

export default ButtonAddToCart;
