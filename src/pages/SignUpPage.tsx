import { configAPI } from "apis/configAPI";
import { ButtonSubmitAuth } from "components/button";
import { FormGroup, FormMessError, FormLabel } from "components/form";
import { Input } from "components/input";
import { path } from "constants/path";
import { SignUpYup } from "constants/yup";
import { useFormik } from "formik";
import { useCheckLoggedIn } from "hooks/useCheckLoggedIn";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "store/configStore";

const SignUpPage = () => {
  const navigate = useNavigate();
  const currentUser = useStore((state: any) => state.currentUser);
  useCheckLoggedIn(currentUser);
  const handleSignUp = async (values: any) => {
    try {
      const response: any = await configAPI.signUp(values);
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
      <div className='py-8 px-6 mt-12 mx-auto max-w-[450px] bg-white w-full rounded-lg'>
        <h1 className='text-[22px] font-medium'>Đăng ký</h1>
        <span>Nhập email và mật khẩu tài khoản Tiki</span>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <Input
              placeholder='Email'
              name='email'
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <FormMessError>{formik.touched.email && formik.errors?.email}</FormMessError>
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor='password'>Mật khẩu</FormLabel>
            <Input
              type='password'
              placeholder='Password'
              name='password'
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <FormMessError>{formik.touched.password && formik.errors?.password}</FormMessError>
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor='confirm_password'>Xác nhận mật khẩu</FormLabel>
            <Input
              type='password'
              placeholder='Repassword'
              name='confirm_password'
              onChange={formik.handleChange}
              value={formik.values.confirm_password}
            />
            <FormMessError>
              {formik.touched.confirm_password && formik.errors?.confirm_password}
            </FormMessError>
          </FormGroup>
          <ButtonSubmitAuth>Đăng ký</ButtonSubmitAuth>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
