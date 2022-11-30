import { authAPI } from "apis";
import { Button } from "components/button";
import { FormGroup, Label, MessageError } from "components/form";
import { Input, InputPassword } from "components/input";
import { PATH } from "constants/path";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "store/globalStore";
import { setCurrentUserLocalStorage } from "utils/localStorage";
import { Helmet } from "react-helmet-async";

const SignInPage = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useStore((state) => state);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email không hợp lệ!").required("Vui lòng nhập email của bạn!"),
      password: Yup.string()
        .required("Vui lòng nhập mật khẩu!")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    }),
    onSubmit: async (values) => {
      try {
        const { data, message } = await authAPI.signIn(values);
        setCurrentUser(data);
        setCurrentUserLocalStorage(data);
        toast.success(message);
        navigate(PATH.home);
      } catch (error) {
        toast.error(error?.message);
      }
    }
  });

  return (
    <div className="layout-container">
      <Helmet>
        <title>Đăng nhập</title>
      </Helmet>
      <div className="px-4 py-8 lg:p-10 max-w-[500px] mx-auto bg-white w-full rounded">
        <h1 className="text-[22px]">Đăng nhập</h1>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup className="mt-4">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <MessageError>{formik.touched.email && formik.errors?.email}</MessageError>
          </FormGroup>
          <FormGroup className="mt-4">
            <Label htmlFor="password">Mật khẩu</Label>
            <InputPassword
              name="password"
              placeholder="Mật khẩu"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <MessageError>{formik.touched.password && formik.errors?.password}</MessageError>
          </FormGroup>
          <Button primary className="w-full mt-3">
            Đăng nhập
          </Button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-[#00000042]">Bạn chưa có tài khoản ? </span>
          <Link to={PATH.signUp} className="text-orangeee4">
            Đăng kí
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
