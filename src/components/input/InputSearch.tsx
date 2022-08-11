import classNames from "utils/className";

interface InputSearchProps {
  placeholder?: string;
  name: string;
  type?: string;
  onChange?: any;
  value?: string | number;
  className?: string;
}

const InputSearch = ({
  placeholder,
  name,
  type,
  onChange,
  value,
  className,
  ...props
}: InputSearchProps) => {
  return (
    <input
      id={name}
      type={type}
      name={name}
      className={classNames("px-4 py-3 w-full bg-[#eaeaea] outline-none", className)}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      {...props}
    />
  );
};

InputSearch.defaultProps = {
  className: "",
  placeholder: "",
  type: "text",
  onChange: () => {},
  value: "",
};

export default InputSearch;
