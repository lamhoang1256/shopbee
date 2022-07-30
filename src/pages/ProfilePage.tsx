import { FormLabel } from "components/form";
import { InputV2 } from "components/input";
import { ProfileGroup } from "modules/profile";

const ProfilePage = () => {
  return (
    <div>
      <ProfileGroup>
        <FormLabel htmlFor='email' className='w-24'>
          Email
        </FormLabel>
        <span>lamhoang@gmail.com</span>
      </ProfileGroup>
      <ProfileGroup>
        <FormLabel htmlFor='fullname' className='w-24'>
          Tên
        </FormLabel>
        <InputV2 name='fullname' type='email' />
      </ProfileGroup>
      <ProfileGroup>
        <FormLabel htmlFor='phone' className='w-24'>
          Số điện thoại
        </FormLabel>
        <InputV2 name='phone' type='text' />
      </ProfileGroup>
      <ProfileGroup>
        <FormLabel htmlFor='address' className='w-24'>
          Địa chỉ
        </FormLabel>
        <InputV2 name='address' type='text' />
      </ProfileGroup>
      <ProfileGroup>
        <FormLabel htmlFor='birthday' className='w-24'>
          Ngày sinh
        </FormLabel>
        <div className='grid w-full max-w-[400px] grid-cols-3 gap-4'>
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
      <button type='submit' className='ml-28 w-[70px] text-white rounded-sm h-10 bg-orangeee4'>
        Lưu
      </button>
    </div>
  );
};

export default ProfilePage;
