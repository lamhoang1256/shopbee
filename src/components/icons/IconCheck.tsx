import classNames from "utils/className";

interface IconCheckProps {
  className?: string;
}

const IconCheck = ({ className }: IconCheckProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={classNames("w-6 h-6", className)}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
    </svg>
  );
};

IconCheck.defaultProps = {
  className: "",
};

export default IconCheck;
