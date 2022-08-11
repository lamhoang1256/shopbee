interface InputRangePriceProps {
  placeholder: string;
  name: string;
  onChange?: any;
  value?: string | number;
}

const InputRangePrice = ({
  placeholder,
  name,
  onChange,
  value,
  ...props
}: InputRangePriceProps) => {
  return (
    <input
      id={name}
      type='number'
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
  onChange: () => {},
  value: "",
};

export default InputRangePrice;
