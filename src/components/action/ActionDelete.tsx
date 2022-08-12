import { IconClose } from "components/icons";
import classNames from "utils/className";

interface ActionDeleteProps {
  onClick: (id?: string) => void;
  className?: string;
}

const ActionDelete = ({ onClick, className }: ActionDeleteProps) => {
  return (
    <button
      type='button'
      onClick={() => onClick()}
      className={classNames(
        "absolute z-10 flex items-center justify-center w-6 h-6 rounded-full bg-redff4 -top-2 -right-2",
        className,
      )}
    >
      <IconClose className='w-[14px] h-[14px] text-white' />
    </button>
  );
};

ActionDelete.defaultProps = {
  className: "",
};

export default ActionDelete;
