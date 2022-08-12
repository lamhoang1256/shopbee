import classNames from "utils/className";

interface LabelProps {
  children: React.ReactNode;
  htmlFor: string;
  className?: string;
}

const Label = ({ children, htmlFor, className }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className={classNames("text-[#555555cc] font-medium", className)}>
      {children}
    </label>
  );
};

Label.defaultProps = {
  className: "",
};

export default Label;
