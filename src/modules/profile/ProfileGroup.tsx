interface ProfileGroupProps {
  children: React.ReactNode;
}

const ProfileGroup = ({ children }: ProfileGroupProps) => {
  return <div className='flex flex-col mb-3 gap-y-1'>{children}</div>;
};

export default ProfileGroup;
