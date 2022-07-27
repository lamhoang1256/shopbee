interface InputProps {
  placeholder: string;
  name: string;
  type?: string;
  onChange?: any;
  value?: string | number;
}

const Input = ({ placeholder, name, type, onChange, value, ...props }: InputProps) => {
  return (
    <input
      id={name}
      type={type}
      name={name}
      className='px-4 w-full font-dm max-w-[400px] outline-none rounded-lg py-3 border border-[#b9b9b9]'
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      {...props}
    />
  );
};

Input.defaultProps = {
  type: "text",
  onChange: () => {},
  value: "",
};

export default Input;
