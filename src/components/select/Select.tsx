interface SelectProps {
  children: React.ReactNode;
  name: string;
  onChange?: any;
  value?: string | number;
}

const Select = ({ name, children, onChange, value }: SelectProps) => {
  return (
    <select
      className='h-10 border border-[#00000024] px-2 outline-none'
      id={name}
      name={name}
      onChange={onChange}
      value={value}
    >
      {children}
    </select>
  );
};

Select.defaultProps = {
  onChange: () => {},
  value: "",
};

export default Select;
