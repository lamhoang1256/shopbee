import { authAPI } from "apis";
import { Button } from "components/button";
import { FormGroup, Label, MessageError } from "components/form";
import { Input, InputPassword } from "components/input";
import { path } from "constants/path";
import { SignUpYup } from "constants/yup";
import { useFormik } from "formik";
import { useCheckLoggedIn } from "hooks/useCheckLoggedIn";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "store/configStore";

const SignUpPage = () => {
  const navigate = useNavigate();
  const currentUser = useStore((state: any) => state.currentUser);
  useCheckLoggedIn(currentUser);
  const handleSignUp = async (values: any) => {
    try {
      const response: any = await authAPI.signUp(values);
      if (response.success) {
        navigate(path.signIn);
        toast.success(response.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: SignUpYup,
    onSubmit: (values) => {
      handleSignUp(values);
    },
  });

  return (
    <div className='layout-container'>
      <div className='px-4 py-8 lg:p-10 ml-auto max-w-[500px] lg:mr-8 bg-white w-full rounded'>
        <h1 className='text-[22px]'>Đăng ký</h1>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup className='mt-4'>
            <Label htmlFor='email'>Email</Label>
            <Input
              placeholder='Email'
              name='email'
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <MessageError>{formik.touched.email && formik.errors?.email}</MessageError>
          </FormGroup>
          <FormGroup className='mt-4'>
            <Label htmlFor='password'>Mật khẩu</Label>
            <InputPassword
              placeholder='Mật khẩu'
              name='password'
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <MessageError>{formik.touched.password && formik.errors?.password}</MessageError>
          </FormGroup>
          <FormGroup className='mt-4'>
            <Label htmlFor='confirm_password'>Xác nhận mật khẩu</Label>
            <InputPassword
              placeholder='Xác nhận mật khẩu'
              name='confirm_password'
              onChange={formik.handleChange}
              value={formik.values.confirm_password}
            />
            <MessageError>
              {formik.touched.confirm_password && formik.errors?.confirm_password}
            </MessageError>
          </FormGroup>
          <Button primary className='w-full mt-3'>
            Đăng kí
          </Button>
        </form>
        <div className='mt-6 text-center'>
          <span className='text-[#00000042]'>Bạn đã có tài khoản ? </span>
          <Link to={path.signIn} className='text-orangeee4'>
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
