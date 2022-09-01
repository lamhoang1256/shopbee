import { toast } from "react-toastify";
import { userAPI } from "apis";
import { Template } from "layouts";
import { uploadImage } from "utils/uploadImage";
import { useStore } from "store/configStore";
import { UserChangeAvatar, UserUpdateMe } from "modules/user";
import { ChangeEvent } from "react";

const ProfilePage = () => {
  const { currentUser, setCurrentUser } = useStore((state) => state);
  const handleChangeAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const newAvatarUrl = await uploadImage(e);
      const { data, message } = await userAPI.updateMe({ avatar: newAvatarUrl });
      const newCurrentUser = { ...currentUser, ...data };
      setCurrentUser(newCurrentUser);
      toast.success(message);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <Template title='Hồ sơ của tôi' desc='Quản lý thông tin hồ sơ để bảo mật tài khoản'>
      <div className='flex flex-col-reverse gap-8 mt-6 lg:flex-row'>
        <UserUpdateMe />
        <UserChangeAvatar avatar={currentUser.avatar} handleChangeAvatar={handleChangeAvatar} />
      </div>
    </Template>
  );
};

export default ProfilePage;
