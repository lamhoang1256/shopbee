import { DropdownProvider } from "./dropdown-context";
import Option from "./Option";
import Select from "./Select";
import List from "./List";

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Dropdown = ({ children, className, ...props }: DropdownProps) => {
  return (
    <DropdownProvider {...props}>
      <div className={`relative inline-block w-full dropdown ${className}`}>{children}</div>
    </DropdownProvider>
  );
};

Dropdown.Option = Option;
Dropdown.Select = Select;
Dropdown.List = List;

export default Dropdown;
