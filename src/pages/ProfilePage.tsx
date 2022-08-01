import { UserTemplate, UserUpdateProfile, UserUploadAvatar } from "modules/user";

const ProfilePage = () => {
  return (
    <UserTemplate label='Hồ sơ của tôi' desc='Quản lý thông tin hồ sơ để bảo mật tài khoản'>
      <div className='flex flex-col-reverse gap-8 lg:flex-row'>
        <UserUpdateProfile />
        <UserUploadAvatar />
      </div>
    </UserTemplate>
  );
};

export default ProfilePage;
