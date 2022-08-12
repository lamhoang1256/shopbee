import { toast } from "react-toastify";
import { useFormik } from "formik";
import { userAPI } from "apis";
import { Button } from "components/button";
import { UserPasswordSchemaYup } from "constants/yup";
import { HeaderTemplate } from "layouts";
import { InputV2 } from "components/input";
import { FormGroup, FormLabel, FormMessError } from "components/form";

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
          <FormLabel htmlFor='currentPassword'>Mật khẩu hiện tại</FormLabel>
          <InputV2
            name='currentPassword'
            type='password'
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
          />
          <FormMessError>
            {formik.touched.currentPassword && formik.errors?.currentPassword}
          </FormMessError>
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor='newPassword'>Mật Khẩu Mới</FormLabel>
          <InputV2
            name='newPassword'
            type='password'
            value={formik.values.newPassword}
            onChange={formik.handleChange}
          />
          <FormMessError>{formik.touched.newPassword && formik.errors?.newPassword}</FormMessError>
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor='confirmPassword'>Xác Nhận Mật Khẩu</FormLabel>
          <InputV2
            name='confirmPassword'
            type='password'
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
          <FormMessError>
            {formik.touched.confirmPassword && formik.errors?.confirmPassword}
          </FormMessError>
        </FormGroup>
        <Button type='submit' primary className='w-full h-10'>
          Lưu
        </Button>
      </form>
    </HeaderTemplate>
  );
};

export default UserChangePassword;
