import { useDropdown } from "./dropdown-context";

interface OptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {}

const Option = ({ onClick, children }: OptionProps) => {
  const { setShow } = useDropdown();
  const handleClick = (e: React.MouseEvent<HTMLOptionElement, MouseEvent>) => {
    if (onClick) onClick(e);
    setShow(false);
  };
  return (
    <option
      onClick={handleClick}
      className='flex items-center justify-between px-4 py-2 overflow-hidden text-sm whitespace-pre transition-all cursor-pointer hover:text-orangeee4 line-clamp-1'
    >
      {children}
    </option>
  );
};

export default Option;
