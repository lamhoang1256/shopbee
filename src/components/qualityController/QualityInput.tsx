interface QualityInputProps {
  value?: number;
}

const QualityInput = ({ value }: QualityInputProps) => {
  return (
    <input
      type='text'
      className='w-12 h-8 border-[#00000017] border text-center outline-none'
      defaultValue={1}
      value={value}
    />
  );
};

QualityInput.defaultProps = {
  value: 1,
};

export default QualityInput;
