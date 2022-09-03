import InputNumber from "./InputNumber";

interface InputRangePriceProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputRangePrice = ({ name, ...props }: InputRangePriceProps) => {
  return (
    <InputNumber
      id={name}
      name={name}
      className='outline-none !h-8 py-0 w-[85px] px-1 bg-white border border-[#00000024]'
      {...props}
    />
  );
};

export default InputRangePrice;
