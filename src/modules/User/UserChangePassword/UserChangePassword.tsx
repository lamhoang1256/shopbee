import { userAPI } from "apis";
import Button from "components/Button";
import FormError from "components/FormError";
import FormGroup from "components/FormGroup";
import InputPassword from "components/InputPassword";
import Label from "components/Label";
import { useFormik } from "formik";
import Template from "layouts/Template";
import { Helmet } from "react-helmet-async";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { initialValuesPasswords, updatePasswordRules } from "utils";

const UserChangePassword = () => {
  const updatePasswordMutation = useMutation({
    mutationFn: (payload: typeof initialValuesPasswords) => userAPI.changePasswordMe(payload)
  });
  const formik = useFormik({
    initialValues: initialValuesPasswords,
    validationSchema: updatePasswordRules,
    onSubmit: async (values, { setErrors }) => {
      updatePasswordMutation.mutate(values, {
        onSuccess: ({ message }) => {
          toast.success(message);
        },
        onError(error: any) {
          setErrors(error.error);
          toast.error(error?.message);
        }
      });
    }
  });
  const { values, touched, errors, handleSubmit, handleChange } = formik;
  return (
    <Template
      title="Đổi Mật Khẩu"
      desc="Để bảo vệ tài khoản, vui lòng không chia sẻ mật khẩu cho người khác"
    >
      <Helmet>
        <title>Đổi mật khẩu</title>
      </Helmet>
      <form autoComplete="off" className="max-w-[470px] mt-4" onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
          <InputPassword
            name="currentPassword"
            value={values.currentPassword}
            onChange={handleChange}
          />
          <FormError>{touched.currentPassword && errors?.currentPassword}</FormError>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="newPassword">Mật Khẩu Mới</Label>
          <InputPassword name="newPassword" value={values.newPassword} onChange={handleChange} />
          <FormError>{touched.newPassword && errors?.newPassword}</FormError>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="confirmPassword">Xác Nhận Mật Khẩu</Label>
          <InputPassword
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
          />
          <FormError>{touched.confirmPassword && errors?.confirmPassword}</FormError>
        </FormGroup>
        <Button type="submit" primary className="w-full h-10">
          Lưu
        </Button>
      </form>
    </Template>
  );
};

export default UserChangePassword;
