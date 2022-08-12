import { useEffect } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { userAPI } from "apis";
import { useStore } from "store/configStore";
import { ProfileSchemaYup } from "constants/yup";
import { Input } from "components/input";
import { Button } from "components/button";
import { UpdateAdministrative } from "components/common";
import { FormGroup, FormLabel, FormMessError } from "components/form";

const UserUpdateProfile = () => {
  const { currentUser, setCurrentUser } = useStore((state) => state);
  const formik = useFormik({
    initialValues: {
      fullname: "",
      phone: "",
      addressHome: "",
      addressAdministrative: "",
      addressIdProvince: "",
      addressIdDistrict: "",
      addressIdCommune: "",
    },
    validationSchema: ProfileSchemaYup,
    onSubmit: async (values) => {
      try {
        const { data, success, message } = await userAPI.updateProfileMe(values);
        if (success) {
          setCurrentUser({ ...currentUser, ...data });
          toast.success(message);
        }
      } catch (error: any) {
        toast.error(error?.message);
      }
    },
  });

  useEffect(() => {
    const fetchProfileNeedUpdate = async () => {
      try {
        const { data } = await userAPI.getSingleUser(currentUser?._id);
        formik.resetForm({
          values: data,
        });
      } catch (error) {
        console.log("Failed to fetch address: ", error);
      }
    };
    fetchProfileNeedUpdate();
  }, []);

  return (
    <form className='lg:w-2/3' onSubmit={formik.handleSubmit} autoComplete='off'>
      <FormGroup>
        <FormLabel htmlFor='email'>Email</FormLabel>
        <span>{currentUser?.email}</span>
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor='fullname'>Họ và tên</FormLabel>
        <Input
          name='fullname'
          type='text'
          value={formik.values.fullname}
          onChange={formik.handleChange}
        />
        <FormMessError>{formik.touched.fullname && formik.errors?.fullname}</FormMessError>
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor='phone'>Số điện thoại</FormLabel>
        <Input
          name='phone'
          type='text'
          value={formik.values.phone}
          onChange={formik.handleChange}
        />
        <FormMessError>{formik.touched.phone && formik.errors?.phone}</FormMessError>
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor='addressAdministrative'>Địa chỉ:</FormLabel>
        <UpdateAdministrative formik={formik} />
        <FormMessError>
          {formik.touched.addressAdministrative && formik.errors?.addressAdministrative}
        </FormMessError>
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor='addressHome'>Địa chỉ nhận hàng cụ thể</FormLabel>
        <Input
          name='addressHome'
          type='text'
          value={formik.values.addressHome}
          onChange={formik.handleChange}
        />
        <FormMessError>{formik.touched.addressHome && formik.errors?.addressHome}</FormMessError>
      </FormGroup>
      <Button type='submit' primary className='w-full h-10'>
        Lưu
      </Button>
    </form>
  );
};

export default UserUpdateProfile;
