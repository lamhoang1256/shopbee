import { defaultUserAvatar } from "constants/global";
import { Button } from "components/_button";
import { ChangeEvent } from "react";
import UserAvatar from "./UserAvatar";

interface UserChangeAvatarProps {
  avatar: string;
  handleChangeAvatar: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const UserChangeAvatar = ({ avatar, handleChangeAvatar }: UserChangeAvatarProps) => {
  return (
    <div className="flex flex-col items-center gap-y-4 lg:w-1/3">
      <UserAvatar urlAvatar={avatar || defaultUserAvatar} />
      <div className="relative w-[100px] mx-auto h-10">
        <Button className="absolute">Chọn ảnh</Button>
        <input
          type="file"
          className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer"
          onChange={handleChangeAvatar}
        />
      </div>
      <div className="text-[#999]">
        <p>Dung lượng file tối đa 1 MB</p>
        <p>Định dạng:.JPEG, .PNG</p>
      </div>
    </div>
  );
};

export default UserChangeAvatar;
