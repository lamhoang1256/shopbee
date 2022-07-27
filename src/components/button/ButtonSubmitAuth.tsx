interface ButtonSubmitAuthProps {
  children: React.ReactNode;
}

const ButtonSubmitAuth = ({ children }: ButtonSubmitAuthProps) => {
  return (
    <button
      className='w-full mt-2 py-[15px] bg-redff4 text-white font-semibold rounded-lg'
      type='submit'
    >
      {children}
    </button>
  );
};

export default ButtonSubmitAuth;
