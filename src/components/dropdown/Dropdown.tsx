import { IconDown, IconUp } from "components/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

interface DropdownProps {
  children: React.ReactNode;
  className?: string;
  dropdownData: {
    display: string;
    path: string;
  }[];
}

const Dropdown = ({ dropdownData, children, className }: DropdownProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <div className={className}>
      <div
        className='flex items-center justify-between cursor-pointer text-[#999] font-medium'
        onClick={handleToggleDropdown}
        aria-hidden='true'
      >
        <span>{children}</span>
        <span>{showDropdown ? <IconUp /> : <IconDown />}</span>
      </div>
      {showDropdown && (
        <ul className='pt-1 pl-6'>
          {dropdownData.map((item) => (
            <li key={uuidv4()} className='py-1'>
              <Link to={item.path} className='transition-all duration-100 hover:text-orangeee4'>
                {item.display}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Dropdown.defaultProps = {
  className: "",
};

export default Dropdown;
