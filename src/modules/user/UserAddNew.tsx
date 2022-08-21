import { userAPI } from "apis";
import { Button } from "components/button";
import { Switch } from "components/checkbox";
import { UpdateAdministrative } from "components/common";
import { FormGroup, Label, MessageError } from "components/form";
import { Input, InputPassword } from "components/input";
import { SignUpYup } from "constants/yup";
import { useFormik } from "formik";
import { Template } from "layouts";
import { toast } from "react-toastify";
import { uploadImage } from "utils/uploadImage";
import UserChangeAvatar from "./UserChangeAvatar";

const UserAddNew = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      fullname: "",
      phone: "",
      password: "",
      confirm_password: "",
      avatar: "",
      street: "",
      cityId: "",
      districtId: "",
      wardId: "",
      address: "",
      isAdmin: false,
    },
    validationSchema: SignUpYup,
    onSubmit: async (values) => {
      try {
        const { success, message } = await userAPI.addNewUser(values);
        if (success) toast.success(message);
      } catch (error: any) {
        toast.error(error?.message);
      }
    },
  });

  const handleUploadAvatar = async (e: any) => {
    const avatar = await uploadImage(e);
    formik.setFieldValue("avatar", avatar);
  };

  return (
    <Template
      label='Thêm người dùng mới'
      desc='Vui lòng nhập đầy đủ thông tin cho sản phẩm của bạn'
    >
      <div className='flex flex-col-reverse gap-8 mt-6 lg:flex-row'>
        <form className='max-w-[600px]' onSubmit={formik.handleSubmit} autoComplete='off'>
          <FormGroup>
            <Label htmlFor='email'>Email</Label>
            <Input name='email' value={formik.values.email} onChange={formik.handleChange} />
            <MessageError>{formik.touched.email && formik.errors?.email}</MessageError>
          </FormGroup>
          <div className='grid gap-2 lg:grid-cols-2'>
            <FormGroup>
              <Label htmlFor='fullname'>Họ và tên</Label>
              <Input
                name='fullname'
                value={formik.values.fullname}
                onChange={formik.handleChange}
              />
              <MessageError>{formik.touched.fullname && formik.errors?.fullname}</MessageError>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='phone'>Số điện thoại</Label>
              <Input name='phone' value={formik.values.phone} onChange={formik.handleChange} />
              <MessageError>{formik.touched.phone && formik.errors?.phone}</MessageError>
            </FormGroup>
          </div>
          <div className='grid gap-2 lg:grid-cols-2'>
            <FormGroup>
              <Label htmlFor='password'>Mật khẩu</Label>
              <InputPassword
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <MessageError>{formik.touched.password && formik.errors?.password}</MessageError>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='confirm_password'>Xác nhận mật khẩu</Label>
              <InputPassword
                name='confirm_password'
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
              />
              <MessageError>
                {formik.touched.confirm_password && formik.errors?.confirm_password}
              </MessageError>
            </FormGroup>
          </div>
          <FormGroup className='mb-0'>
            <Label htmlFor='address'>Địa chỉ:</Label>
            <UpdateAdministrative formik={formik} />
            <MessageError>{formik.touched.address && formik.errors?.address}</MessageError>
          </FormGroup>
          <FormGroup>
            <Label htmlFor='street'>Địa chỉ nhận hàng cụ thể</Label>
            <Input name='street' value={formik.values.street} onChange={formik.handleChange} />
            <MessageError>{formik.touched.street && formik.errors?.street}</MessageError>
          </FormGroup>
          <FormGroup>
            <Label htmlFor='isAdmin'>Quyền quản trị (Admin)</Label>
            <Switch
              checked={formik.values.isAdmin}
              handleOnChangeSwitch={(checked) => {
                formik.setFieldValue("isAdmin", checked);
              }}
            />
            <MessageError>{formik.touched.isAdmin && formik.errors?.isAdmin}</MessageError>
          </FormGroup>
          <Button type='submit' primary className='w-full h-10'>
            Lưu
          </Button>
        </form>
        <UserChangeAvatar avatar={formik.values.avatar} handleChangeAvatar={handleUploadAvatar} />
      </div>
    </Template>
  );
};

export default UserAddNew;
