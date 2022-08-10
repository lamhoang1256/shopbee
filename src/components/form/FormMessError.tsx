import classNames from "utils/className";

interface FormMessErrorProps {
  children: React.ReactNode;
  className?: string;
}

const FormMessError = ({ children, className }: FormMessErrorProps) => {
  return (
    <span className={classNames("text-redff4 text-xs font-medium", className)}>{children}</span>
  );
};

FormMessError.defaultProps = {
  className: "",
};

export default FormMessError;
