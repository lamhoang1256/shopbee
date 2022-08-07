import { configAPI } from "apis/configAPI";
import { Button } from "components/button";
import { defaultUserAvatar } from "constants/global";
import { toast } from "react-toastify";
import { useStore } from "store/configStore";
import { uploadImage } from "utils/uploadImage";

const UserUpdateAvatar = () => {
  const { currentUser, setCurrentUser } = useStore((state) => state);
  const handleUploadAvatar = async (e: any) => {
    try {
      const urlImage = await uploadImage(e);
      const { data, success, message } = await configAPI.userUpdateProfile({
        _id: currentUser?._id,
        avatar: urlImage,
      });
      if (success) {
        const newCurrentUser = { ...currentUser, ...data };
        setCurrentUser(newCurrentUser);
        toast.success(message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className='flex flex-col items-center gap-y-4 lg:w-1/3'>
      <img
        src={currentUser?.avatar || defaultUserAvatar}
        alt='avatar'
        className='w-[100px] h-[100px] rounded-full'
      />
      <div className='relative w-[100px] mx-auto h-10'>
        <Button className='absolute'>Chọn ảnh</Button>
        <input type='file' className='absolute inset-0 opacity-0' onChange={handleUploadAvatar} />
      </div>
      <div className='text-[#999]'>
        <p>Dung lượng file tối đa 1 MB</p>
        <p>Định dạng:.JPEG, .PNG</p>
      </div>
    </div>
  );
};

export default UserUpdateAvatar;
