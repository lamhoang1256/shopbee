import { userAPI } from "apis";
import { Button } from "components/button";
import { Switch } from "components/checkbox";
import { UpdateAdministrative } from "components/common";
import { FormGroup, Label, MessageError } from "components/form";
import { Input } from "components/input";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Template } from "layouts";
import { ChangeEvent, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { uploadImage } from "utils/uploadImage";
import UserChangeAvatar from "./UserChangeAvatar";

const UserUpdate = () => {
  const { id = "" } = useParams();
  const formik = useFormik({
    initialValues: {
      fullname: "",
      phone: "",
      email: "",
      avatar: "",
      street: "",
      city: { id: "", name: "" },
      district: { id: "", name: "" },
      ward: { id: "", name: "" },
      address: "",
      isAdmin: false,
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Vui lòng nhập họ và tên!"),
      phone: Yup.string()
        .required("Vui lòng nhập số điện thoại!")
        .max(20, "Số điện thoại tối đa là 20 kí tự!"),
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
      try {
        const { street, city, district, ward } = values;
        const address = `${street}, ${ward.name}, ${district.name}, ${city.name}`;
        const { message } = await userAPI.updateUser({ ...values, address });
        toast.success(message);
      } catch (error) {
        toast.error(error?.message);
      }
    },
  });

  const handleChangeAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const newAvatarUrl = await uploadImage(e);
      const { message, data } = await userAPI.updateMe({ avatar: newAvatarUrl });
      formik.setFieldValue("avatar", data?.avatar);
      toast.success(message);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const { data } = await userAPI.getSingleUser(id);
        formik.resetForm({ values: data });
      } catch (error) {
        toast.error(error?.message);
      }
    };
    fetchDataUser();
  }, []);

  return (
    <Template
      title='Chỉnh sửa thông tin người dùng'
      desc='Vui lòng nhập đầy đủ thông tin cho sản phẩm của bạn'
    >
      <div className='flex flex-col-reverse gap-8 mt-6 lg:flex-row'>
        <form className='max-w-[600px]' onSubmit={formik.handleSubmit} autoComplete='off'>
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
          <div className='grid gap-2 lg:grid-cols-2'>
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
          </div>
          <FormGroup>
            <Label htmlFor='address'>Địa chỉ: {formik.values.address}</Label>
            <UpdateAdministrative formik={formik} />
            <MessageError>{formik.touched.address && formik.errors?.address}</MessageError>
          </FormGroup>
          <FormGroup>
            <Label htmlFor='street'>Địa chỉ nhận hàng cụ thể</Label>
            <Input
              name='street'
              type='text'
              value={formik.values.street}
              onChange={formik.handleChange}
            />
            <MessageError>{formik.touched.street && formik.errors?.street}</MessageError>
          </FormGroup>
          <FormGroup>
            <Label htmlFor='isAdmin'>Quyền quản trị (Admin)</Label>
            <Switch
              checked={formik.values.isAdmin}
              handleOnChangeSwitch={(checked) => formik.setFieldValue("isAdmin", checked)}
            />
            <MessageError>{formik.touched.isAdmin && formik.errors?.isAdmin}</MessageError>
          </FormGroup>
          <Button type='submit' primary className='w-full h-10'>
            Lưu
          </Button>
        </form>
        <UserChangeAvatar avatar={formik.values.avatar} handleChangeAvatar={handleChangeAvatar} />
      </div>
    </Template>
  );
};

export default UserUpdate;
