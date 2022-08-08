import { Button } from "components/button";
import { defaultUserAvatar } from "constants/global";

interface UserUpdateAvatarProps {
  avatar: string;
  handleUpdateAvatar: (e: any) => Promise<void>;
}

const UserUpdateAvatar = ({ avatar, handleUpdateAvatar }: UserUpdateAvatarProps) => {
  return (
    <div className='flex flex-col items-center gap-y-4 lg:w-1/3'>
      <img
        src={avatar || defaultUserAvatar}
        alt='avatar'
        className='w-[100px] h-[100px] rounded-full'
      />
      <div className='relative w-[100px] mx-auto h-10'>
        <Button className='absolute'>Chọn ảnh</Button>
        <input type='file' className='absolute inset-0 opacity-0' onChange={handleUpdateAvatar} />
      </div>
      <div className='text-[#999]'>
        <p>Dung lượng file tối đa 1 MB</p>
        <p>Định dạng:.JPEG, .PNG</p>
      </div>
    </div>
  );
};

export default UserUpdateAvatar;
