import { authAPI } from "apis";
import Button from "components/Button";
import FormError from "components/FormError";
import FormGroup from "components/FormGroup";
import Input from "components/Input";
import InputPassword from "components/InputPassword";
import Label from "components/Label";
import { PATH } from "constants/path";
import { useFormik } from "formik";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "store/globalStore";
import { setCurrentUserLocalStorage } from "utils/localStorage";
import { signInRules } from "utils/rules";

const SignInPage = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useStore((state) => state);
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: signInRules,
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
            <FormError>{formik.touched.email && formik.errors?.email}</FormError>
          </FormGroup>
          <FormGroup className="mt-4">
            <Label htmlFor="password">Mật khẩu</Label>
            <InputPassword
              name="password"
              placeholder="Mật khẩu"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <FormError>{formik.touched.password && formik.errors?.password}</FormError>
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
