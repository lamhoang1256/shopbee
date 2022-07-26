import classNames from "utils/className";

interface CheckBoxProps {
  className?: string;
}

const CheckBox = ({ className }: CheckBoxProps) => {
  return (
    <input type='checkbox' className={classNames("w-[18px] h-[18px] accent-blue1a", className)} />
  );
};

CheckBox.defaultProps = {
  className: "",
};

export default CheckBox;
