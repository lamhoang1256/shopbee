interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ name, ...props }: InputProps) => {
  return (
    <input
      id={name}
      name={name}
      className='px-4 outline-none h-10 border border-[#00000024]'
      {...props}
    />
  );
};

export default Input;
