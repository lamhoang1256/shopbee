import classNames from "utils/className";

interface SectionGrayProps {
  children: React.ReactNode;
  className?: string;
}

const SectionGray = ({ children, className }: SectionGrayProps) => {
  return <div className={classNames("bg-[#fafafa] px-5 py-4 ", className)}>{children}</div>;
};

SectionGray.defaultProps = {
  className: "",
};

export default SectionGray;
