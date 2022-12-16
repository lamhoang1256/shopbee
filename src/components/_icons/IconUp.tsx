import classNames from "utils/classNames";

interface IconUpProps extends React.SVGProps<SVGSVGElement> {}

const IconUp = ({ className }: IconUpProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classNames("w-5 h-5", className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
    </svg>
  );
};

export default IconUp;
