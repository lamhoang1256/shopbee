interface QuantityInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  handleChange: (quantity: number) => void;
}

const QuantityInput = ({ handleChange, ...props }: QuantityInputProps) => {
  return (
    <input
      min={1}
      type='number'
      onChange={(e) => handleChange(Number(e.target.value))}
      className='w-10 lg:w-12 h-6 lg:h-8 border-[#00000017] border text-center outline-none'
      {...props}
    />
  );
};

export default QuantityInput;
