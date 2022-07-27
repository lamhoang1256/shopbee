import { configAPI } from "apis/configAPI";
import { FormGroup, Label } from "components/form";
import { Input } from "components/input";
import { path } from "constants/path";
import { useFormik } from "formik";
import { useCheckLoggedIn } from "hooks/useCheckLoggedIn";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "store/configStore";
import * as Yup from "yup";

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
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Password's not match")
        .required("Required!"),
    }),
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
            <Label htmlFor='email'>Email</Label>
            <Input
              placeholder='Email'
              name='email'
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <span className='text-redff4'>
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </span>
          </FormGroup>
          <FormGroup>
            <Label htmlFor='password'>Mật khẩu</Label>
            <Input
              type='password'
              placeholder='Password'
              name='password'
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <span className='text-redff4'>
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </span>
          </FormGroup>
          <FormGroup>
            <Label htmlFor='confirm_password'>Xác nhận mật khẩu</Label>
            <Input
              type='password'
              placeholder='Repassword'
              name='confirm_password'
              onChange={formik.handleChange}
              value={formik.values.confirm_password}
            />
            <span className='text-redff4'>
              {formik.touched.confirm_password && formik.errors.confirm_password ? (
                <div>{formik.errors.confirm_password}</div>
              ) : null}
            </span>
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
