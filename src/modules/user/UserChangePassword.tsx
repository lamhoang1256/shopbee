import { FormLabel } from "components/form";
import { InputV2 } from "components/input";
import { ProfileGroup } from "modules/profile";
import UserTemplate from "./UserTemplate";

const UserChangePassword = () => {
  return (
    <UserTemplate
      label='Đổi Mật Khẩu'
      desc='Để bảo vệ tài khoản, vui lòng không chia sẻ mật khẩu cho người khác'
    >
      <form className='lg:w-1/2'>
        <ProfileGroup>
          <FormLabel htmlFor='currentPassword'>Mật khẩu hiện tại</FormLabel>
          <InputV2 name='currentPassword' type='password' />
        </ProfileGroup>
        <ProfileGroup>
          <FormLabel htmlFor='newPassword'>Mật Khẩu Mới</FormLabel>
          <InputV2 name='newPassword' type='password' />
        </ProfileGroup>
        <ProfileGroup>
          <FormLabel htmlFor='confirmPassword'>Xác Nhận Mật Khẩu</FormLabel>
          <InputV2 name='confirmPassword' type='password' />
        </ProfileGroup>
        <button type='submit' className='w-full h-10 mt-2 text-white rounded bg-orangeee4'>
          Lưu
        </button>
      </form>
    </UserTemplate>
  );
};

export default UserChangePassword;
