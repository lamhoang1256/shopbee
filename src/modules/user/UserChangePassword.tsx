import { userAPI } from "apis";
import { Button } from "components/button";
import { FormGroup, Label, MessageError } from "components/form";
import { InputPassword } from "components/input";
import { UserPasswordSchemaYup } from "constants/yup";
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
    validationSchema: UserPasswordSchemaYup,
    onSubmit: async (values) => {
      try {
        const { success, message } = await userAPI.changePasswordMe(values);
        if (success) toast.success(message);
      } catch (error: any) {
        toast.error(error?.message);
      }
    },
  });
  return (
    <Template
      label='Đổi Mật Khẩu'
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
