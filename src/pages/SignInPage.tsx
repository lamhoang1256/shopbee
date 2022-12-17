import { authAPI } from "apis";
import Button from "components/Button";
import Label from "components/Label";
import FormError from "components/FormError";
import FormGroup from "components/FormGroup";
import Input from "components/Input";
import InputPassword from "components/InputPassword";
import { PATH } from "constants/path";
import { useFormik } from "formik";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "store/globalStore";
import { setCurrentUserLocalStorage, signInRules } from "utils";
import { useMutation } from "react-query";
import { IPayloadAuth } from "@types";

const SignInPage = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useStore((state) => state);
  const signInMutation = useMutation({
    mutationFn: (payload: IPayloadAuth) => authAPI.signIn(payload)
  });
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: signInRules,
    onSubmit: async (values, { setErrors }) => {
      signInMutation.mutate(values, {
        onSuccess: ({ message, data }) => {
          setCurrentUser(data);
          setCurrentUserLocalStorage(data);
          toast.success(message);
          navigate(PATH.home);
        },
        onError(error: any) {
          toast.error(error?.message);
          setErrors(error.error);
        }
      });
    }
  });
  const { values, handleChange, touched, errors, handleSubmit } = formik;
  return (
    <div className="layout-container">
      <Helmet>
        <title>Đăng nhập</title>
      </Helmet>
      <div className="px-4 py-8 lg:p-10 max-w-[500px] mx-auto bg-white w-full rounded">
        <h1 className="text-[22px]">Đăng nhập</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup className="mt-4">
            <Label htmlFor="email">Email</Label>
            <Input name="email" placeholder="Email" value={values.email} onChange={handleChange} />
            <FormError>{touched.email && errors?.email}</FormError>
          </FormGroup>
          <FormGroup className="mt-4">
            <Label htmlFor="password">Mật khẩu</Label>
            <InputPassword
              name="password"
              placeholder="Mật khẩu"
              onChange={handleChange}
              value={values.password}
            />
            <FormError>{touched.password && errors?.password}</FormError>
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
