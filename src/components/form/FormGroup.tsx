import classNames from "utils/className";

interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
}

const FormGroup = ({ children, className }: FormGroupProps) => {
  return <div className={classNames("flex flex-col mb-3 gap-y-1", className)}>{children}</div>;
};

FormGroup.defaultProps = {
  className: "",
};

export default FormGroup;
