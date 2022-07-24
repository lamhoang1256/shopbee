interface SectionHeaderProps {
  children: React.ReactNode;
}

const SectionHeader = ({ children }: SectionHeaderProps) => {
  return (
    <h3 className='px-5 py-4 my-4 text-lg font-normal uppercase bg-white text-black33'>
      {children}
    </h3>
  );
};

export default SectionHeader;
