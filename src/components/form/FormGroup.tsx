interface FormGroupProps {
  children: React.ReactNode;
}

const FormGroup = ({ children }: FormGroupProps) => {
  return <div className='flex flex-col mb-3 gap-y-1'>{children}</div>;
};

export default FormGroup;
