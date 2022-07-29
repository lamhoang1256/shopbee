interface QuantityInputProps {
  value: number;
  onChange: (value: string) => void;
}

const QuantityInput = ({ value, onChange }: QuantityInputProps) => {
  return (
    <input
      type='text'
      className='w-10 lg:w-12 h-6 lg:h-8 border-[#00000017] border text-center outline-none'
      value={value}
      min={1}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default QuantityInput;
