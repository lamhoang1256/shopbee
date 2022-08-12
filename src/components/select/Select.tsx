interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = ({ name, children, ...props }: SelectProps) => {
  return (
    <select
      id={name}
      name={name}
      className='h-10 border border-[#00000024] px-2 outline-none'
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;
