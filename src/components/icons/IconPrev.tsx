import classNames from "utils/className";

interface IconPrevProps extends React.SVGProps<SVGSVGElement> {}

const IconPrev = ({ className }: IconPrevProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={classNames("w-6 h-6", className)}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M15 19l-7-7 7-7' />
    </svg>
  );
};

export default IconPrev;
