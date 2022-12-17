import { IPayloadAuth } from "@types";
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
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signUpRules } from "utils";

const SignUpPage = () => {
  const navigate = useNavigate();
  const signUpMutation = useMutation({
    mutationFn: (payload: IPayloadAuth) => authAPI.signUp(payload)
  });
  const formik = useFormik({
    initialValues: { email: "", password: "", confirm_password: "" },
    validationSchema: signUpRules,
    onSubmit: async (values, { setErrors }) => {
      signUpMutation.mutate(values, {
        onSuccess: ({ message }) => {
          toast.success(message);
          navigate(PATH.signIn);
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
        <title>Đăng ký</title>
      </Helmet>
      <div className="px-4 py-8 lg:p-10 mx-auto max-w-[500px] bg-white w-full rounded">
        <h1 className="text-[22px]">Đăng ký</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup className="mt-4">
            <Label htmlFor="email">Email</Label>
            <Input name="email" placeholder="Email" onChange={handleChange} value={values.email} />
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
          <FormGroup className="mt-4">
            <Label htmlFor="confirm_password">Xác nhận mật khẩu</Label>
            <InputPassword
              name="confirm_password"
              placeholder="Xác nhận mật khẩu"
              onChange={handleChange}
              value={values.confirm_password}
            />
            <FormError>{touched.confirm_password && errors?.confirm_password}</FormError>
          </FormGroup>
          <Button primary className="w-full mt-3">
            Đăng kí
          </Button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-[#00000042]">Bạn đã có tài khoản ? </span>
          <Link to={PATH.signIn} className="text-orangeee4">
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
