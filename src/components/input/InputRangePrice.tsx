interface InputRangePriceProps {
  placeholder: string;
  name: string;
  type?: string;
  onChange?: any;
  value?: string | number;
}

const InputRangePrice = ({
  placeholder,
  name,
  type,
  onChange,
  value,
  ...props
}: InputRangePriceProps) => {
  return (
    <input
      id={name}
      type={type}
      name={name}
      className='outline-none h-8 w-[85px] px-1 bg-white border border-[#00000024]'
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      {...props}
    />
  );
};

InputRangePrice.defaultProps = {
  type: "text",
  onChange: () => {},
  value: "",
};

export default InputRangePrice;
