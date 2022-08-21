import { toast } from "react-toastify";
import { userAPI } from "apis";
import { Template } from "layouts";
import { uploadImage } from "utils/uploadImage";
import { useStore } from "store/configStore";
import { UserChangeAvatar, UserUpdateMe } from "modules/user";

const ProfilePage = () => {
  const { currentUser, setCurrentUser } = useStore((state) => state);
  const handleChangeAvatar = async (e: any) => {
    try {
      const avatar = await uploadImage(e);
      const { data, success, message } = await userAPI.updateMe({ avatar });
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
    <Template label='Hồ sơ của tôi' desc='Quản lý thông tin hồ sơ để bảo mật tài khoản'>
      <div className='flex flex-col-reverse gap-8 mt-6 lg:flex-row'>
        <UserUpdateMe />
        <UserChangeAvatar avatar={currentUser.avatar} handleChangeAvatar={handleChangeAvatar} />
      </div>
    </Template>
  );
};

export default ProfilePage;
