import classNames from "utils/className";

interface IconClipboardProps {
  className?: string;
}

const IconClipboard = ({ className }: IconClipboardProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={classNames("w-6 h-6", className)}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
    </svg>
  );
};

IconClipboard.defaultProps = {
  className: "",
};

export default IconClipboard;
