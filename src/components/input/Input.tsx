import classNames from "utils/className";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ name, className = "", ...props }: InputProps) => {
  return (
    <input
      id={name}
      name={name}
      className={classNames(
        "px-4 rounded-sm outline-none h-10 border border-[#00000024]",
        className,
      )}
      {...props}
    />
  );
};

export default Input;
