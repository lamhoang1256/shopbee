import { userAPI } from "apis";
import Button from "components/Button";
import Label from "components/Label";
import FormError from "components/FormError";
import FormGroup from "components/FormGroup";
import { InputPassword } from "components/_input";
import * as Yup from "yup";
import { useFormik } from "formik";
import Template from "layouts/Template";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const UserChangePassword = () => {
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string()
        .required("Vui lòng nhập mật khẩu!")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
      newPassword: Yup.string()
        .required("Vui lòng nhập mật khẩu!")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Xác nhận mật khẩu không khớp!")
        .required("Vui lòng nhập xác nhận mật khẩu!")
    }),
    onSubmit: async (values) => {
      try {
        const { message } = await userAPI.changePasswordMe(values);
        toast.success(message);
      } catch (error) {
        toast.error(error?.message);
      }
    }
  });
  return (
    <Template
      title="Đổi Mật Khẩu"
      desc="Để bảo vệ tài khoản, vui lòng không chia sẻ mật khẩu cho người khác"
    >
      <Helmet>
        <title>Đổi mật khẩu</title>
      </Helmet>
      <form className="max-w-[470px] mt-4" onSubmit={formik.handleSubmit} autoComplete="off">
        <FormGroup>
          <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
          <InputPassword
            name="currentPassword"
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
          />
          <FormError>{formik.touched.currentPassword && formik.errors?.currentPassword}</FormError>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="newPassword">Mật Khẩu Mới</Label>
          <InputPassword
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
          />
          <FormError>{formik.touched.newPassword && formik.errors?.newPassword}</FormError>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="confirmPassword">Xác Nhận Mật Khẩu</Label>
          <InputPassword
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
          <FormError>{formik.touched.confirmPassword && formik.errors?.confirmPassword}</FormError>
        </FormGroup>
        <Button type="submit" primary className="w-full h-10">
          Lưu
        </Button>
      </form>
    </Template>
  );
};

export default UserChangePassword;
