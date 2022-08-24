import { DropdownProvider } from "./dropdown-context";
import Option from "./Option";
import Select from "./Select";
import List from "./List";

interface DropdownProps {
  children: React.ReactNode;
}

const Dropdown = ({ children, ...props }: DropdownProps) => {
  return <DropdownProvider {...props}>{children}</DropdownProvider>;
};

Dropdown.Option = Option;
Dropdown.Select = Select;
Dropdown.List = List;

export default Dropdown;
