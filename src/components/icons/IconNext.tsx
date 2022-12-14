import classNames from "utils/classNames";

interface IconNextProps extends React.SVGProps<SVGSVGElement> {}

const IconNext = ({ className }: IconNextProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classNames("w-6 h-6", className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
};

export default IconNext;
