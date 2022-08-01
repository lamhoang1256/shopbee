import { FormGroup, FormLabel, FormMessError } from "components/form";
import { InputV2 } from "components/input";
import { UserChangePasswordYup } from "constants/yup";
import { useFormik } from "formik";
import UserTemplate from "./UserTemplate";

const UserChangePassword = () => {
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: UserChangePasswordYup,
    onSubmit: (values) => {
      console.log("values: ", values);
    },
  });
  return (
    <UserTemplate
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
        <button
          type='submit'
          className='w-full h-10 mt-2 text-white rounded password-white bg-orangeee4'
        >
          Lưu
        </button>
      </form>
    </UserTemplate>
  );
};

export default UserChangePassword;
