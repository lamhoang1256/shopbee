import { HeaderTemplate } from "layouts";
import { UserUpdateProfile, UserUpdateAvatar } from "modules/user";

const ProfilePage = () => {
  return (
    <HeaderTemplate label='Hồ sơ của tôi' desc='Quản lý thông tin hồ sơ để bảo mật tài khoản'>
      <div className='flex flex-col-reverse gap-8 lg:flex-row'>
        <UserUpdateProfile />
        <UserUpdateAvatar />
      </div>
    </HeaderTemplate>
  );
};

export default ProfilePage;
