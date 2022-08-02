import { Button } from "components/button";
import { defaultAvatar } from "constants/global";

const UserUpdateAvatar = () => {
  return (
    <div className='flex flex-col items-center gap-y-4 lg:w-1/3'>
      <img src={defaultAvatar} alt='avatar' className='w-[100px] h-[100px] rounded-full' />
      <Button>Chọn ảnh</Button>
      <div className='text-[#999]'>
        <p>Dung lượng file tối đa 1 MB</p>
        <p>Định dạng:.JPEG, .PNG</p>
      </div>
    </div>
  );
};

export default UserUpdateAvatar;
