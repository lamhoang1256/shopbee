interface ProfileGroupProps {
  children: React.ReactNode;
}

const ProfileGroup = ({ children }: ProfileGroupProps) => {
  return <div className='flex items-center mb-6 gap-x-4'>{children}</div>;
};

export default ProfileGroup;
