import { authAPI } from "apis";
import { Button } from "components/button";
import { FormGroup, FormLabel, FormMessError } from "components/form";
import { InputV2 } from "components/input";
import { path } from "constants/path";
import { SignInYup } from "constants/yup";
import { useFormik } from "formik";
import { useCheckLoggedIn } from "hooks/useCheckLoggedIn";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "store/configStore";
import { setCurrentUserLocalStorage } from "utils/localStorage";

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
        setCurrentUserLocalStorage(response.data);
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
      <div className='px-4 py-8 lg:p-10 ml-auto max-w-[500px] lg:mr-8 bg-white w-full rounded'>
        <h1 className='text-[22px]'>Đăng nhập</h1>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup className='mt-4'>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <InputV2
              placeholder='Email'
              name='email'
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <FormMessError>{formik.touched.email && formik.errors?.email}</FormMessError>
          </FormGroup>
          <FormGroup className='mt-4'>
            <FormLabel htmlFor='password'>Mật khẩu</FormLabel>
            <InputV2
              type='password'
              placeholder='Password'
              name='password'
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <FormMessError>{formik.touched.password && formik.errors?.password}</FormMessError>
          </FormGroup>
          <Button primary className='w-full mt-3'>
            Đăng nhập
          </Button>
        </form>
        <div className='mt-6 text-center'>
          <span className='text-[#00000042]'>Bạn chưa có tài khoản ? </span>
          <Link to={path.signUp} className='text-orangeee4'>
            Đăng kí
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
