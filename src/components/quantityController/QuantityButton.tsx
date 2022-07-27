interface QuantityButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const QuantityButton = ({ children, onClick }: QuantityButtonProps) => {
  return (
    <button
      type='button'
      className='border-[#00000017] border w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center'
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default QuantityButton;
