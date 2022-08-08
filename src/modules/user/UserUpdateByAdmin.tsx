import { configAPI } from "apis/configAPI";
import { userAPI } from "apis/userAPI";
import { Button } from "components/button";
import { Switch } from "components/checkbox";
import { FormGroup, FormLabel, FormMessError } from "components/form";
import { InputV2 } from "components/input";
import { UserProfileYup } from "constants/yup";
import { useFormik } from "formik";
import { HeaderTemplate } from "layouts";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UserUpdateAdministrative from "./UserUpdateAdministrative";

const UserUpdateByAdmin = () => {
  const { id } = useParams();

  const handleUpdateUser = async (values: any) => {
    try {
      const { success, message } = await configAPI.userUpdateProfile(values);
      if (success) toast.success(message);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      _id: "",
      fullname: "",
      phone: "",
      email: "",
      isAdmin: false,
      addressHome: "",
      addressAdministrative: "",
    },
    validationSchema: UserProfileYup,
    onSubmit: (values) => {
      handleUpdateUser(values);
    },
  });

  console.log(formik.values);

  const fetchUser = async () => {
    try {
      const { data, success } = await userAPI.getSingleUser(id || "");
      if (success) {
        formik.resetForm({
          values: data,
        });
      }
    } catch (error) {
      console.log("Failed to fetch user: ", error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <HeaderTemplate
      label='Cập nhật thông tin người dùng'
      desc='Vui lòng nhập đầy đủ thông tin cho sản phẩm của bạn'
    >
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
          <FormMessError>{formik.touched.addressHome && formik.errors?.addressHome}</FormMessError>
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
    </HeaderTemplate>
  );
};

export default UserUpdateByAdmin;