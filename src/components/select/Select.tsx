interface SelectProps extends React.HTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  name: string;
  value?: string;
}

const Select = ({ name, children, value, ...props }: SelectProps) => {
  return (
    <select
      className='h-10 border border-[#00000024] px-2 outline-none'
      id={name}
      name={name}
      value={value}
      {...props}
    >
      {children}
    </select>
  );
};

Select.defaultProps = {
  value: "",
};

export default Select;
