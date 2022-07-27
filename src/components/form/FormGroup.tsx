interface FormGroupProps {
  children: React.ReactNode;
}

const FormGroup = ({ children }: FormGroupProps) => {
  return <div className='flex flex-col my-3 gap-y-2'>{children}</div>;
};

export default FormGroup;
