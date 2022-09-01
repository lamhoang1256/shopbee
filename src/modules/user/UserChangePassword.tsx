import { userAPI } from "apis";
import { Button } from "components/button";
import { FormGroup, Label, MessageError } from "components/form";
import { InputPassword } from "components/input";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Template } from "layouts";
import { toast } from "react-toastify";

const UserChangePassword = () => {
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Vui lòng nhập mật khẩu!"),
      newPassword: Yup.string().required("Vui lòng nhập mật khẩu!"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Xác nhận mật khẩu không khớp!")
        .required("Vui lòng nhập xác nhận mật khẩu!"),
    }),
    onSubmit: async (values) => {
      try {
        const { message } = await userAPI.changePasswordMe(values);
        toast.success(message);
      } catch (err: any) {
        toast.error(err?.message);
      }
    },
  });
  return (
    <Template
      title='Đổi Mật Khẩu'
      desc='Để bảo vệ tài khoản, vui lòng không chia sẻ mật khẩu cho người khác'
    >
      <form className='max-w-[470px] mt-4' onSubmit={formik.handleSubmit} autoComplete='off'>
        <FormGroup>
          <Label htmlFor='currentPassword'>Mật khẩu hiện tại</Label>
          <InputPassword
            name='currentPassword'
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
          />
          <MessageError>
            {formik.touched.currentPassword && formik.errors?.currentPassword}
          </MessageError>
        </FormGroup>
        <FormGroup>
          <Label htmlFor='newPassword'>Mật Khẩu Mới</Label>
          <InputPassword
            name='newPassword'
            value={formik.values.newPassword}
            onChange={formik.handleChange}
          />
          <MessageError>{formik.touched.newPassword && formik.errors?.newPassword}</MessageError>
        </FormGroup>
        <FormGroup>
          <Label htmlFor='confirmPassword'>Xác Nhận Mật Khẩu</Label>
          <InputPassword
            name='confirmPassword'
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
          <MessageError>
            {formik.touched.confirmPassword && formik.errors?.confirmPassword}
          </MessageError>
        </FormGroup>
        <Button type='submit' primary className='w-full h-10'>
          Lưu
        </Button>
      </form>
    </Template>
  );
};

export default UserChangePassword;
