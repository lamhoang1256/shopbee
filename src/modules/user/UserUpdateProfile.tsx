import { FormLabel } from "components/form";
import { InputV2 } from "components/input";
import { ProfileGroup } from "modules/profile";

const UserUpdateProfile = () => {
  return (
    <form className='lg:w-2/3'>
      <ProfileGroup>
        <FormLabel htmlFor='email'>Email</FormLabel>
        <span>lamhoang@gmail.com</span>
      </ProfileGroup>
      <ProfileGroup>
        <FormLabel htmlFor='fullname'>Tên</FormLabel>
        <InputV2 name='fullname' type='email' />
      </ProfileGroup>
      <ProfileGroup>
        <FormLabel htmlFor='phone'>Số điện thoại</FormLabel>
        <InputV2 name='phone' type='text' />
      </ProfileGroup>
      <ProfileGroup>
        <FormLabel htmlFor='address'>Tỉnh/ Thành phố, Quận/Huyện, Phường/Xã</FormLabel>
        <InputV2 name='address' type='text' />
      </ProfileGroup>
      <ProfileGroup>
        <FormLabel htmlFor='specificalAddress'>Địa chỉ cụ thể</FormLabel>
        <InputV2 name='specificalAddress' type='text' />
      </ProfileGroup>
      <ProfileGroup>
        <FormLabel htmlFor='birthday'>Ngày sinh</FormLabel>
        <div className='grid grid-cols-3 gap-4'>
          <select
            className='w-full h-10 border border-[#00000024] px-2 outline-none'
            name='birthday-day'
            id='birthday-day'
          >
            <option value='1'>1</option>
            <option value='2'>2</option>
          </select>
          <select
            className='w-full h-10 border border-[#00000024] px-2 outline-none'
            name='birthday-month'
            id='birthday-month'
          >
            <option value='1'>1</option>
            <option value='2'>2</option>
          </select>
          <select
            className='w-full h-10 border border-[#00000024] px-2 outline-none'
            name='birthday-year'
            id='birthday-year'
          >
            <option value='1'>1</option>
            <option value='2'>2</option>
          </select>
        </div>
      </ProfileGroup>
      <button type='submit' className='w-full h-10 mt-2 text-white rounded bg-orangeee4'>
        Lưu
      </button>
    </form>
  );
};

export default UserUpdateProfile;
