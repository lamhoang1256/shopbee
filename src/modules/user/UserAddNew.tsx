import { userAPI } from "apis";
import { Button } from "components/button";
import { Switch } from "components/checkbox";
import { UpdateAdministrative } from "components/common";
import { FormGroup, Label, MessageError } from "components/form";
import { Input } from "components/input";
import { SignUpYup } from "constants/yup";
import { useFormik } from "formik";
import { HeaderTemplate } from "layouts";
import { toast } from "react-toastify";
import { uploadImage } from "utils/uploadImage";
import UserChangeAvatar from "./UserChangeAvatar";

const UserAddNew = () => {
  const formik = useFormik({
    initialValues: {
      fullname: "",
      phone: "",
      email: "",
      password: "",
      confirm_password: "",
      avatar: "",
      isAdmin: false,
      addressDetail: "",
      addressAdministrative: "",
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
    <HeaderTemplate
      label='Thêm người dùng mới'
      desc='Vui lòng nhập đầy đủ thông tin cho sản phẩm của bạn'
    >
      <div className='flex flex-col-reverse gap-8 lg:flex-row'>
        <form className='lg:w-2/3' onSubmit={formik.handleSubmit} autoComplete='off'>
          <FormGroup>
            <Label htmlFor='email'>Email</Label>
            <Input
              name='email'
              type='text'
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <MessageError>{formik.touched.email && formik.errors?.email}</MessageError>
          </FormGroup>
          <FormGroup>
            <Label htmlFor='password'>Mật khẩu</Label>
            <Input
              name='password'
              type='password'
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <MessageError>{formik.touched.password && formik.errors?.password}</MessageError>
          </FormGroup>
          <FormGroup>
            <Label htmlFor='confirm_password'>Xác nhận mật khẩu</Label>
            <Input
              name='confirm_password'
              type='password'
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
            />
            <MessageError>
              {formik.touched.confirm_password && formik.errors?.confirm_password}
            </MessageError>
          </FormGroup>
          <FormGroup>
            <Label htmlFor='fullname'>Họ và tên</Label>
            <Input
              name='fullname'
              type='text'
              value={formik.values.fullname}
              onChange={formik.handleChange}
            />
            <MessageError>{formik.touched.fullname && formik.errors?.fullname}</MessageError>
          </FormGroup>
          <FormGroup>
            <Label htmlFor='phone'>Số điện thoại</Label>
            <Input
              name='phone'
              type='text'
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            <MessageError>{formik.touched.phone && formik.errors?.phone}</MessageError>
          </FormGroup>
          <FormGroup>
            <Label htmlFor='addressAdministrative'>
              Địa chỉ: {formik.values.addressAdministrative}
            </Label>
            <UpdateAdministrative formik={formik} />
            <MessageError>
              {formik.touched.addressAdministrative && formik.errors?.addressAdministrative}
            </MessageError>
          </FormGroup>
          <FormGroup>
            <Label htmlFor='addressDetail'>Địa chỉ nhận hàng cụ thể</Label>
            <Input
              name='addressDetail'
              type='text'
              value={formik.values.addressDetail}
              onChange={formik.handleChange}
            />
            <MessageError>
              {formik.touched.addressDetail && formik.errors?.addressDetail}
            </MessageError>
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
    </HeaderTemplate>
  );
};

export default UserAddNew;
