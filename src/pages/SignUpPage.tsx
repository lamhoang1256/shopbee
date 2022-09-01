import { authAPI } from "apis";
import { Button } from "components/button";
import { FormGroup, Label, MessageError } from "components/form";
import { Input, InputPassword } from "components/input";
import { PATH } from "constants/path";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email không hợp lệ!").required("Vui lòng nhập email của bạn!"),
      password: Yup.string().required("Vui lòng nhập mật khẩu!"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Xác nhận mật khẩu không khớp!")
        .required("Vui lòng nhập xác nhận mật khẩu!"),
    }),
    onSubmit: async (values) => {
      try {
        const { message } = await authAPI.signUp(values);
        navigate(PATH.signIn);
        toast.success(message);
      } catch (err: any) {
        toast.error(err?.message);
      }
    },
  });

  return (
    <div className='layout-container'>
      <div className='px-4 py-8 lg:p-10 mx-auto max-w-[500px] bg-white w-full rounded'>
        <h1 className='text-[22px]'>Đăng ký</h1>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup className='mt-4'>
            <Label htmlFor='email'>Email</Label>
            <Input
              name='email'
              placeholder='Email'
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <MessageError>{formik.touched.email && formik.errors?.email}</MessageError>
          </FormGroup>
          <FormGroup className='mt-4'>
            <Label htmlFor='password'>Mật khẩu</Label>
            <InputPassword
              name='password'
              placeholder='Mật khẩu'
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <MessageError>{formik.touched.password && formik.errors?.password}</MessageError>
          </FormGroup>
          <FormGroup className='mt-4'>
            <Label htmlFor='confirm_password'>Xác nhận mật khẩu</Label>
            <InputPassword
              name='confirm_password'
              placeholder='Xác nhận mật khẩu'
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
          <Link to={PATH.signIn} className='text-orangeee4'>
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
