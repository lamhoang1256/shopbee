import Button from "components/Button";
import { defaultUserAvatar } from "constants/global";
import { ChangeEvent } from "react";

interface UserUploadAvatarProps {
  avatar: string;
  onChangeAvatar: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const UserUploadAvatar = ({ avatar, onChangeAvatar }: UserUploadAvatarProps) => {
  return (
    <div className="flex flex-col items-center gap-y-4 lg:w-1/3">
      <img
        alt="avatar"
        src={avatar || defaultUserAvatar}
        className="w-[100px] h-[100px] rounded-full"
      />
      <div className="relative w-[100px] mx-auto h-10">
        <Button className="absolute">Chọn ảnh</Button>
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer"
          onChange={onChangeAvatar}
        />
      </div>
      <div className="text-[#999]">
        <p>Dung lượng file tối đa 1 MB</p>
        <p>Định dạng:.JPEG, .PNG</p>
      </div>
    </div>
  );
};

export default UserUploadAvatar;
