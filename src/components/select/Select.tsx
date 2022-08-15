import { SelectHTMLAttributes } from "react";
import classNames from "utils/className";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

const Select = ({ name, className = "", children, ...props }: SelectProps) => {
  return (
    <select
      id={name}
      name={name}
      className={classNames("h-10 border border-[#00000024] px-2 outline-none", className)}
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;
