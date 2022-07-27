interface FormMessErrorProps {
  children: React.ReactNode;
}

const FormMessError = ({ children }: FormMessErrorProps) => {
  return <span className='text-redff4'>{children}</span>;
};

export default FormMessError;
