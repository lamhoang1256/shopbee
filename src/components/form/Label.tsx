interface LabelProps {
  children: React.ReactNode;
  htmlFor: string;
}

const Label = ({ children, htmlFor }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className='text-[#3B3E44] font-medium'>
      {children}
    </label>
  );
};

export default Label;
