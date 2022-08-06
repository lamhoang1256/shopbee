interface SelectProps {
  children: React.ReactNode;
  name: string;
  onChange?: () => void;
}

const Select = ({ name, children, onChange }: SelectProps) => {
  return (
    <select
      className='h-10 border border-[#00000024] px-2 outline-none'
      id={name}
      name={name}
      onChange={onChange}
    >
      {children}
    </select>
  );
};

Select.defaultProps = {
  onChange: () => {},
};

export default Select;
