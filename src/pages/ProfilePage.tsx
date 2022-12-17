import { userAPI } from "apis";
import Template from "layouts/Template";
import UserUploadAvatar from "modules/User/UserUploadAvatar";
import { UserUpdateMe } from "modules/_user";
import { ChangeEvent } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { useStore } from "store/globalStore";
import { uploadImage } from "utils/uploadImage";

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
    <Template title="Hồ sơ của tôi" desc="Quản lý thông tin hồ sơ để bảo mật tài khoản">
      <Helmet>
        <title>Hồ sơ của tôi</title>
      </Helmet>
      <div className="flex flex-col-reverse gap-8 mt-6 lg:flex-row">
        <UserUpdateMe />
        <UserUploadAvatar avatar={currentUser.avatar} onChangeAvatar={handleChangeAvatar} />
      </div>
    </Template>
  );
};

export default ProfilePage;
