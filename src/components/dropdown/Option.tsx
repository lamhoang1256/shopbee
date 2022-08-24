import { useDropdown } from "./dropdown-context";

interface OptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {}

const Option = ({ onClick, children }: OptionProps) => {
  const { setShow } = useDropdown();
  const handleClick = (e: any) => {
    if (onClick) onClick(e);
    setShow(false);
  };
  return (
    <div
      aria-hidden
      className='flex items-center justify-between px-5 py-4 text-sm transition-all cursor-pointer hover:text-primary'
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default Option;
