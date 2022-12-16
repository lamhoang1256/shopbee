import { OptionHTMLAttributes } from "react";

interface OptionProps extends OptionHTMLAttributes<HTMLOptionElement> {
  children: React.ReactNode;
}

const Option = ({ children, value }: OptionProps) => {
  return <option value={value}>{children}</option>;
};

export default Option;
