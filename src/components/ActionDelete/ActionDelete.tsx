import { IconClose } from "components/Icons";
import { ButtonHTMLAttributes } from "react";
import classNames from "utils/classNames";

interface ActionDeleteProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const ActionDelete = ({ className, ...props }: ActionDeleteProps) => {
  return (
    <button
      type="button"
      className={classNames(
        "absolute z-10 flex items-center justify-center w-6 h-6 rounded-full bg-redff4 -top-2 -right-2",
        className
      )}
      {...props}
    >
      <IconClose className="w-[14px] h-[14px] text-white" />
    </button>
  );
};

export default ActionDelete;
