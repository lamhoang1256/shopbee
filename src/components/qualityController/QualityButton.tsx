interface QualityButtonProps {
  children: React.ReactNode;
}

const QualityButton = ({ children }: QualityButtonProps) => {
  return (
    <button
      type='button'
      className='border-[#00000017] border w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center'
    >
      {children}
    </button>
  );
};

export default QualityButton;
