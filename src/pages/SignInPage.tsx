import { authAPI } from "apis";
import { ButtonSubmitAuth } from "components/button";
import { FormGroup, FormLabel, FormMessError } from "components/form";
import { Input } from "components/input";
import { path } from "constants/path";
import { SignInYup } from "constants/yup";
import { useFormik } from "formik";
import { useCheckLoggedIn } from "hooks/useCheckLoggedIn";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "store/configStore";

const SignInPage = () => {
  const navigate = useNavigate();
  const { setCurrentUser, currentUser } = useStore((state: any) => ({
    setCurrentUser: state.setCurrentUser,
    currentUser: state.currentUser,
  }));
  useCheckLoggedIn(currentUser);
  const handleSignIn = async (values: any) => {
    try {
      const response: any = await authAPI.signIn(values);
      if (response.success) {
        setCurrentUser(response.data);
        toast.success(response.message);
        navigate(path.home);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInYup,
    onSubmit: (values) => {
      handleSignIn(values);
    },
  });
  return (
    <div className='layout-container'>
      <div className='py-8 px-6 mt-12 mx-auto max-w-[450px] bg-white w-full rounded-lg'>
        <h1 className='text-[22px] font-medium'>Đăng nhập với email</h1>
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
            <FormLabel htmlFor='password'>Password</FormLabel>
            <Input
              type='password'
              placeholder='Password'
              name='password'
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <FormMessError>{formik.touched.password && formik.errors?.password}</FormMessError>
          </FormGroup>
          <ButtonSubmitAuth>Đăng nhập</ButtonSubmitAuth>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
