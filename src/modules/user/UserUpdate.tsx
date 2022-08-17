import { userAPI } from "apis";
import { Button } from "components/button";
import { Switch } from "components/checkbox";
import { UpdateAdministrative } from "components/common";
import { FormGroup, Label, MessageError } from "components/form";
import { Input } from "components/input";
import { ProfileSchemaYup } from "constants/yup";
import { useFormik } from "formik";
import { HeaderTemplate } from "layouts";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { uploadImage } from "utils/uploadImage";
import UserChangeAvatar from "./UserChangeAvatar";

const UserUpdate = () => {
  const { id = "" } = useParams();
  const formik = useFormik({
    initialValues: {
      _id: "",
      fullname: "",
      phone: "",
      email: "",
      avatar: "",
      isAdmin: false,
      street: "",
      address: "",
    },
    validationSchema: ProfileSchemaYup,
    onSubmit: async (values) => {
      try {
        const { success, message } = await userAPI.updateUser(values);
        if (success) toast.success(message);
      } catch (error: any) {
        toast.error(error?.message);
      }
    },
  });

  const handleChangeAvatar = async (e: any) => {
    try {
      const avatar = await uploadImage(e);
      const { success, message, data } = await userAPI.updateMe({ avatar });
      if (success) {
        formik.setFieldValue("avatar", data?.avatar);
        toast.success(message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    const fetchUserNeedUpdate = async () => {
      try {
        const { data } = await userAPI.getSingleUser(id);
        formik.resetForm({
          values: data,
        });
      } catch (error) {
        console.log("Failed to fetch user: ", error);
      }
    };
    fetchUserNeedUpdate();
  }, []);

  return (
    <HeaderTemplate
      label='Cập nhật thông tin người dùng'
      desc='Vui lòng nhập đầy đủ thông tin cho sản phẩm của bạn'
    >
      <div className='flex flex-col-reverse gap-8 lg:flex-row'>
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
        <UserChangeAvatar avatar={formik.values.avatar} handleChangeAvatar={handleChangeAvatar} />
      </div>
    </HeaderTemplate>
  );
};

export default UserUpdate;
