interface InputProps {
  placeholder: string;
  name: string;
  type?: string;
}

const Input = ({ placeholder, name, type }: InputProps) => {
  return (
    <input
      id={name}
      type={type}
      className='px-4 w-full font-dm max-w-[400px] outline-none rounded-lg py-3 border border-b-[#e0e0e0]'
      placeholder={placeholder}
    />
  );
};

Input.defaultProps = {
  type: "text",
};

export default Input;
