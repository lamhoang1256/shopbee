import { configAPI } from "apis/configAPI";
import { FormGroup, Label } from "components/form";
import { Input } from "components/input";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useStore } from "store/configStore";
import * as Yup from "yup";

const SignInPage = () => {
  const signIn = useStore((state: any) => state.signIn);
  const currentUser = useStore((state: any) => state.currentUser);
  console.log("currentUser: ", currentUser);
  const handleSignIn = async (values: any) => {
    try {
      const response: any = await configAPI.signIn(values);
      if (response.success) {
        signIn(response.data);
        toast.success(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
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
            <Label htmlFor='password'>Password</Label>
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
          <button
            className='w-full mt-2 py-[12px] bg-redff4 text-white font-semibold rounded-lg'
            type='submit'
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
