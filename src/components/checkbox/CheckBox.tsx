import classNames from "utils/classNames";

interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const CheckBox = ({ className, onChange, checked }: CheckBoxProps) => {
  return (
    <input
      type="checkbox"
      className={classNames("w-[18px] h-[18px] accent-orangeee4", className)}
      onChange={onChange}
      checked={checked}
    />
  );
};

export default CheckBox;
