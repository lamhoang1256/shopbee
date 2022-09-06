import { InputNumber } from "components/input";

interface QuantityInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  handleChange: (quantity: number) => void;
}

const QuantityInput = ({ handleChange, ...props }: QuantityInputProps) => {
  return (
    <InputNumber
      onChange={(e) => handleChange(Number(e.target.value))}
      className='w-10 lg:w-12 px-0 !h-6 lg:h-8 border-[#00000017] border text-center outline-none'
      {...props}
    />
  );
};

export default QuantityInput;
