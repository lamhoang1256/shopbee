import classNames from "utils/className";

interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const FormGroup = ({ children, className }: FormGroupProps) => {
  return <div className={classNames("flex flex-col mb-3 gap-y-1", className)}>{children}</div>;
};

export default FormGroup;
