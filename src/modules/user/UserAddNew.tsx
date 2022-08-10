import { userAPI } from "apis";
import { Button } from "components/button";
import { Switch } from "components/checkbox";
import { FormGroup, FormLabel, FormMessError } from "components/form";
import { InputV2 } from "components/input";
import { SignUpYup } from "constants/yup";
import { useFormik } from "formik";
import { HeaderTemplate } from "layouts";
import { toast } from "react-toastify";
import { uploadImage } from "utils/uploadImage";
import UserUpdateAdministrative from "./UserUpdateAdministrative";
import UserUpdateAvatar from "./UserUpdateAvatar";

const UserAddNew = () => {
  const handleAddNewUser = async (values: any) => {
    try {
      const { success, message } = await userAPI.addNewUser(values);
      if (success) toast.success(message);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      fullname: "",
      phone: "",
      email: "",
      password: "",
      confirm_password: "",
      avatar: "",
      isAdmin: false,
      addressHome: "",
      addressAdministrative: "",
    },
    validationSchema: SignUpYup,
    onSubmit: (values) => {
      handleAddNewUser(values);
    },
  });

  const handleUploadAvatar = async (e: any) => {
    const avatar = await uploadImage(e);
    formik.setFieldValue("avatar", avatar);
  };

  return (
    <HeaderTemplate
      label='Thêm người dùng mới'
      desc='Vui lòng nhập đầy đủ thông tin cho sản phẩm của bạn'
    >
      <div className='flex flex-col-reverse gap-8 lg:flex-row'>
        <form className='lg:w-2/3' onSubmit={formik.handleSubmit} autoComplete='off'>
          <FormGroup>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <InputV2
              name='email'
              type='text'
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <FormMessError>{formik.touched.email && formik.errors?.email}</FormMessError>
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor='password'>Mật khẩu</FormLabel>
            <InputV2
              name='password'
              type='password'
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <FormMessError>{formik.touched.password && formik.errors?.password}</FormMessError>
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor='confirm_password'>Xác nhận mật khẩu</FormLabel>
            <InputV2
              name='confirm_password'
              type='password'
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
            />
            <FormMessError>
              {formik.touched.confirm_password && formik.errors?.confirm_password}
            </FormMessError>
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor='fullname'>Họ và tên</FormLabel>
            <InputV2
              name='fullname'
              type='text'
              value={formik.values.fullname}
              onChange={formik.handleChange}
            />
            <FormMessError>{formik.touched.fullname && formik.errors?.fullname}</FormMessError>
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor='phone'>Số điện thoại</FormLabel>
            <InputV2
              name='phone'
              type='text'
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            <FormMessError>{formik.touched.phone && formik.errors?.phone}</FormMessError>
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor='addressAdministrative'>
              Địa chỉ: {formik.values.addressAdministrative}
            </FormLabel>
            <UserUpdateAdministrative formik={formik} />
            <FormMessError>
              {formik.touched.addressAdministrative && formik.errors?.addressAdministrative}
            </FormMessError>
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor='addressHome'>Địa chỉ nhận hàng cụ thể</FormLabel>
            <InputV2
              name='addressHome'
              type='text'
              value={formik.values.addressHome}
              onChange={formik.handleChange}
            />
            <FormMessError>
              {formik.touched.addressHome && formik.errors?.addressHome}
            </FormMessError>
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor='isAdmin'>Quyền quản trị (Admin)</FormLabel>
            <Switch
              isChecked={formik.values.isAdmin}
              handleOnChangeSwitch={(checked) => {
                formik.setFieldValue("isAdmin", checked);
              }}
            />
            <FormMessError>{formik.touched.isAdmin && formik.errors?.isAdmin}</FormMessError>
          </FormGroup>
          <Button type='submit' primary className='w-full h-10'>
            Lưu
          </Button>
        </form>
        <UserUpdateAvatar avatar={formik.values.avatar} handleUpdateAvatar={handleUploadAvatar} />
      </div>
    </HeaderTemplate>
  );
};

export default UserAddNew;
