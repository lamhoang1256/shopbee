import classNames from "utils/className";

interface ButtonShowMoreProps {
  children: React.ReactNode;
  className?: string;
}

const ButtonShowMore = ({ children, className }: ButtonShowMoreProps) => {
  return (
    <button
      type='button'
      className={classNames(
        "flex justify-center text-[13px] font-medium items-center w-[240px] py-2 text-[#0d5cb6] border border-[#0d5cb6] transition-all duration-300 hover:text-white hover:bg-[#0d5cb6] rounded",
        className,
      )}
    >
      {children}
    </button>
  );
};

ButtonShowMore.defaultProps = {
  className: "",
};

export default ButtonShowMore;
