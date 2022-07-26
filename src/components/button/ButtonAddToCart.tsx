import classNames from "utils/className";

interface ButtonAddToCartProps {
  children: React.ReactNode;
  className?: string;
}

const ButtonAddToCart = ({ children, className }: ButtonAddToCartProps) => {
  return (
    <button
      type='button'
      className={classNames(
        "flex justify-center font-semibold items-center text-white bg-redff4 rounded",
        className,
      )}
    >
      {children}
    </button>
  );
};

ButtonAddToCart.defaultProps = {
  className: "w-[210px] h-[40px]",
};

export default ButtonAddToCart;
