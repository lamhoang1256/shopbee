interface UserTemplateProps {
  children: React.ReactNode;
  label: string;
  desc: string;
}

const UserTemplate = ({ label, desc, children }: UserTemplateProps) => {
  return (
    <div className='p-5 pb-10 bg-white rounded'>
      <div className='border-b-[1px] pb-5 border-[#efefef]'>
        <h2 className='text-lg font-medium'>{label}</h2>
        <span>{desc}</span>
      </div>
      <div className='pt-6'>{children}</div>
    </div>
  );
};

export default UserTemplate;