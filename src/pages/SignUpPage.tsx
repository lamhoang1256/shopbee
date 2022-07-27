import { FormGroup, Label } from "components/form";
import { Input } from "components/input";

const SignUpPage = () => {
  return (
    <div className='mt-6 max-w-[450px] mx-auto'>
      <div className='pt-[35px] px-[45px] pb-[50px] bg-white w-full rounded-lg'>
        <h1 className='text-[22px] font-medium'>Đăng ký</h1>
        <span>Nhập email và mật khẩu tài khoản Tiki</span>
        <form>
          <FormGroup>
            <Label htmlFor='email'>Email</Label>
            <Input placeholder='Email' name='email' />
          </FormGroup>
          <FormGroup>
            <Label htmlFor='password'>Mật khẩu</Label>
            <Input type='password' placeholder='Password' name='password' />
          </FormGroup>
          <FormGroup>
            <Label htmlFor='re-password'>Xác nhận mật khẩu</Label>
            <Input type='password' placeholder='Repassword' name='re-password' />
          </FormGroup>
          <button
            className='w-full mt-2 py-[15px] bg-redff4 text-white font-semibold rounded-lg'
            type='submit'
          >
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
