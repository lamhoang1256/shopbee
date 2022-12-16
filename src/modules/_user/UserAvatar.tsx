import { defaultUserAvatar } from "constants/global";

interface UserAvatarProps {
  urlAvatar: string;
  className?: string;
}

const UserAvatar = ({ urlAvatar, className }: UserAvatarProps) => {
  return <img src={urlAvatar || defaultUserAvatar} alt="avatar" className={className} />;
};

UserAvatar.defaultProps = {
  className: "w-[100px] h-[100px] rounded-full"
};

export default UserAvatar;
