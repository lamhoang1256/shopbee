interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  handleOnChangeSwitch?: (checked?: boolean) => void;
}

const Switch = ({ checked, handleOnChangeSwitch }: SwitchProps) => {
  const onChangeSwitch = (e: any) => {
    if (handleOnChangeSwitch) handleOnChangeSwitch(e.target.checked);
  };
  return (
    <label htmlFor='default-toggle' className='relative inline-flex items-center cursor-pointer'>
      <input
        type='checkbox'
        id='default-toggle'
        className='sr-only peer'
        checked={checked}
        onChange={(e) => onChangeSwitch(e)}
      />
      <div className="w-[52px] h-[28px] bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-orangeee4" />
    </label>
  );
};

Switch.defaultProps = {
  handleOnChangeSwitch: () => {},
};

export default Switch;
