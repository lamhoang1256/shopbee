import { toast } from "react-toastify";
import { useFormik } from "formik";
import { userAPI } from "apis";
import { Button } from "components/button";
import { UserPasswordSchemaYup } from "constants/yup";
import { HeaderTemplate } from "layouts";
import { Input } from "components/input";
import { FormGroup, Label, MessageError } from "components/form";

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
    <HeaderTemplate
      label='Đổi Mật Khẩu'
      desc='Để bảo vệ tài khoản, vui lòng không chia sẻ mật khẩu cho người khác'
    >
      <form className='lg:w-1/2' onSubmit={formik.handleSubmit} autoComplete='off'>
        <FormGroup>
          <Label htmlFor='currentPassword'>Mật khẩu hiện tại</Label>
          <Input
            name='currentPassword'
            type='password'
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
          />
          <MessageError>
            {formik.touched.currentPassword && formik.errors?.currentPassword}
          </MessageError>
        </FormGroup>
        <FormGroup>
          <Label htmlFor='newPassword'>Mật Khẩu Mới</Label>
          <Input
            name='newPassword'
            type='password'
            value={formik.values.newPassword}
            onChange={formik.handleChange}
          />
          <MessageError>{formik.touched.newPassword && formik.errors?.newPassword}</MessageError>
        </FormGroup>
        <FormGroup>
          <Label htmlFor='confirmPassword'>Xác Nhận Mật Khẩu</Label>
          <Input
            name='confirmPassword'
            type='password'
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
    </HeaderTemplate>
  );
};

export default UserChangePassword;
