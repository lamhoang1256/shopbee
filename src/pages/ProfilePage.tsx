import { userAPI } from "apis";
import { HeaderTemplate } from "layouts";
import { UserUpdateAvatar, UserUpdateProfile } from "modules/user";
import { toast } from "react-toastify";
import { useStore } from "store/configStore";
import { uploadImage } from "utils/uploadImage";

const ProfilePage = () => {
  const { currentUser, setCurrentUser } = useStore((state) => state);
  const handleUpdateAvatar = async (e: any) => {
    try {
      const avatar = await uploadImage(e);
      const payload = {
        _id: currentUser?._id,
        avatar,
      };
      const { data, success, message } = await userAPI.updateProfileMe(payload);
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
    <HeaderTemplate label='Hồ sơ của tôi' desc='Quản lý thông tin hồ sơ để bảo mật tài khoản'>
      <div className='flex flex-col-reverse gap-8 lg:flex-row'>
        <UserUpdateProfile />
        <UserUpdateAvatar avatar={currentUser.avatar} handleUpdateAvatar={handleUpdateAvatar} />
      </div>
    </HeaderTemplate>
  );
};

export default ProfilePage;
