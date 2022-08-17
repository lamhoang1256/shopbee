import { authAPI } from "apis";
import { Button } from "components/button";
import { FormGroup, Label, MessageError } from "components/form";
import { Input, InputPassword } from "components/input";
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
  const { setCurrentUser, currentUser } = useStore((state) => state);
  useCheckLoggedIn(currentUser);

  const handleSignIn = async (values: any) => {
    try {
      const { success, data, message } = await authAPI.signIn(values);
      if (success) {
        setCurrentUser(data);
        setCurrentUserLocalStorage(data);
        toast.success(message);
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
              placeholder='Password'
              name='password'
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <MessageError>{formik.touched.password && formik.errors?.password}</MessageError>
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
