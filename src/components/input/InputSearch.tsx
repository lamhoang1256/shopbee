import classNames from "utils/classNames";

interface InputSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputSearch = ({ name, className, ...props }: InputSearchProps) => {
  return (
    <input
      id={name}
      name={name}
      className={classNames("px-4 py-3 w-full bg-[#eaeaea] outline-none", className)}
      {...props}
    />
  );
};

export default InputSearch;
