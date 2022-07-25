interface QualityButtonProps {
  children: React.ReactNode;
}

const QualityButton = ({ children }: QualityButtonProps) => {
  return (
    <button
      type='button'
      className='border-[#00000017] border w-8 h-8 flex items-center justify-center'
    >
      {children}
    </button>
  );
};

export default QualityButton;
