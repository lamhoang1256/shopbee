import classNames from "utils/classNames";

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const SectionHeader = ({ children, className }: SectionHeaderProps) => {
  return (
    <div className={classNames("px-5 py-4 text-lg uppercase bg-white text-black33", className)}>
      {children}
    </div>
  );
};

export default SectionHeader;
