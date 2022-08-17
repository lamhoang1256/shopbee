import classNames from "utils/className";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ name, className = "", ...props }: InputProps) => {
  return (
    <input
      id={name}
      name={name}
      className={classNames(
        "px-4 rounded-sm outline-none h-10 border border-[rgba(0, 0, 0, 0.14)] border-[#00000024] focus:border focus:border-[rgba(0,0,0,0.54)] shadow-input",
        className,
      )}
      {...props}
    />
  );
};

export default Input;
