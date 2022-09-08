import { userAPI } from "apis";
import { Button } from "components/button";
import { Switch } from "components/checkbox";
import { Administrative } from "components/administrative";
import { FormGroup, Label, MessageError } from "components/form";
import { Input, InputPassword } from "components/input";
import { useFormik } from "formik";
import { Template } from "layouts";
import { ChangeEvent } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { uploadImage } from "utils/uploadImage";
import * as Yup from "yup";
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
      city: { id: "", name: "" },
      district: { id: "", name: "" },
      ward: { id: "", name: "" },
      address: "",
      isAdmin: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email không hợp lệ!").required("Vui lòng nhập email của bạn!"),
      fullname: Yup.string().required("Vui lòng nhập họ và tên!"),
      phone: Yup.string()
        .required("Vui lòng nhập số điện thoại!")
        .max(20, "Số điện thoại tối đa là 20 kí tự!"),
      password: Yup.string()
        .required("Vui lòng nhập mật khẩu!")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Xác nhận mật khẩu không khớp!")
        .required("Vui lòng nhập xác nhận mật khẩu!"),
      street: Yup.string().required("Vui lòng nhập địa chỉ cụ thể!"),
      city: Yup.object().shape({
        id: Yup.string().required("Vui lòng chọn Tỉnh/Thành phố!"),
        name: Yup.string().required("Vui lòng chọn Tỉnh/Thành phố!"),
      }),
      district: Yup.object().shape({
        id: Yup.string().required("Vui lòng chọn Quận/Huyện!"),
        name: Yup.string().required("Vui lòng chọn Quận/Huyện!"),
      }),
      ward: Yup.object().shape({
        id: Yup.string().required("Vui lòng chọn Phường/Xã!"),
        name: Yup.string().required("Vui lòng chọn Phường/Xã!"),
      }),
    }),
    onSubmit: async (values) => {
      const { street, city, district, ward } = values;
      const address = `${street}, ${ward.name}, ${district.name}, ${city.name}`;
      try {
        const { message } = await userAPI.addNewUser({ ...values, address });
        toast.success(message);
      } catch (error) {
        toast.error(error?.message);
      }
    },
  });

  const handleUploadAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    const avatar = await uploadImage(e);
    formik.setFieldValue("avatar", avatar);
  };

  return (
    <Template title='Thêm người dùng mới' desc='Vui lòng nhập đầy đủ thông tin của người dùng'>
      <Helmet>
        <title>Thêm người dùng mới</title>
      </Helmet>
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
            <Administrative formik={formik} />
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
              name='isAdmin'
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
