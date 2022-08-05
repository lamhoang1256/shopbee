import classNames from "utils/className";

interface SectionHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const SectionHeader = ({ children, className }: SectionHeaderProps) => {
  return (
    <div className={classNames("px-5 py-4 text-lg uppercase bg-white text-black33", className)}>
      {children}
    </div>
  );
};

SectionHeader.defaultProps = {
  className: "",
};

export default SectionHeader;
