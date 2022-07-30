interface InputV2Props {
  placeholder?: string;
  name: string;
  type?: string;
  onChange?: any;
  value?: string | number;
}

const InputV2 = ({ placeholder, name, type, onChange, value, ...props }: InputV2Props) => {
  return (
    <input
      id={name}
      type={type}
      name={name}
      className='px-4 w-full max-w-[400px] outline-none h-10 border border-[#00000024]'
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      {...props}
    />
  );
};

InputV2.defaultProps = {
  placeholder: "",
  type: "text",
  onChange: () => {},
  value: "",
};

export default InputV2;
