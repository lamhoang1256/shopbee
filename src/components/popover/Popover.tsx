/* eslint-disable react/jsx-no-useless-fragment */
import classNames from "utils/className";

interface PopoverProps {
  active: boolean;
  children: React.ReactNode;
  className?: string;
}

const Popover = ({ active, children, className }: PopoverProps) => {
  return (
    <>
      {active && (
        <div className={classNames("popover", className)}>
          <span className='popover-arrow' />
          <div className='popover-content'>{children}</div>
        </div>
      )}
    </>
  );
};

Popover.defaultProps = {
  className: "",
};

export default Popover;
