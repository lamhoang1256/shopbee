import classNames from "utils/className";

interface CheckBoxProps {
  className?: string;
  onChange?: (e: any) => void;
  checked?: boolean;
}

const CheckBox = ({ className, onChange, checked }: CheckBoxProps) => {
  return (
    <input
      type='checkbox'
      className={classNames("w-[18px] h-[18px] accent-orangeee4", className)}
      onChange={onChange}
      checked={checked}
    />
  );
};

CheckBox.defaultProps = {
  className: "",
  onChange: () => {},
  checked: false,
};

export default CheckBox;
