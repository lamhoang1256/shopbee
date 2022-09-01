interface HeaderTemplateProps {
  title: string;
  desc: string;
  children: React.ReactNode;
}

const Template = ({ title, desc, children }: HeaderTemplateProps) => {
  return (
    <div className='p-5 pb-10 bg-white rounded'>
      <div className='border-b-[1px] pb-5 border-[#efefef]'>
        <h2 className='text-lg font-medium'>{title}</h2>
        <span>{desc}</span>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Template;
