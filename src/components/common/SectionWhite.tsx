import classNames from "utils/className";

interface SectionWhiteProps {
  children: React.ReactNode;
  className?: string;
}

const SectionWhite = ({ children, className }: SectionWhiteProps) => {
  return (
    <div className={classNames("px-4 py-5 bg-white rounded-md shadow2", className)}>{children}</div>
  );
};

SectionWhite.defaultProps = {
  className: "",
};

export default SectionWhite;
