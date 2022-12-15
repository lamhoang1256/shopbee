import { HTMLAttributes } from "react";
import classNames from "utils/classNames";

interface FormErrorProps extends HTMLAttributes<HTMLSpanElement> {}

const FormError = ({ children, className }: FormErrorProps) => {
  return (
    <span className={classNames("text-redff4 text-xs font-medium", className)}>{children}</span>
  );
};

export default FormError;
