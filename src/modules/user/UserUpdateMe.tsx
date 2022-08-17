import { useEffect } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { userAPI } from "apis";
import { useStore } from "store/configStore";
import { ProfileSchemaYup } from "constants/yup";
import { Input } from "components/input";
import { Button } from "components/button";
import { UpdateAdministrative } from "components/common";
import { FormGroup, Label, MessageError } from "components/form";

const UserUpdateMe = () => {
  const { currentUser, setCurrentUser } = useStore((state) => state);
  const formik = useFormik({
    initialValues: {
      fullname: "",
      phone: "",
      street: "",
      address: "",
      cityId: "",
      districtId: "",
      wardId: "",
    },
    validationSchema: ProfileSchemaYup,
    onSubmit: async (values) => {
      try {
        const { data, success, message } = await userAPI.updateMe(values);
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
    <form className='max-w-[600px]' onSubmit={formik.handleSubmit} autoComplete='off'>
      <FormGroup>
        <Label htmlFor='email'>Email</Label>
        <span>{currentUser?.email}</span>
      </FormGroup>
      <FormGroup>
        <Label htmlFor='fullname'>Họ và tên</Label>
        <Input name='fullname' value={formik.values.fullname} onChange={formik.handleChange} />
        <MessageError>{formik.touched.fullname && formik.errors?.fullname}</MessageError>
      </FormGroup>
      <FormGroup>
        <Label htmlFor='phone'>Số điện thoại</Label>
        <Input name='phone' value={formik.values.phone} onChange={formik.handleChange} />
        <MessageError>{formik.touched.phone && formik.errors?.phone}</MessageError>
      </FormGroup>
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
      <Button type='submit' primary className='w-full h-10'>
        Lưu
      </Button>
    </form>
  );
};

export default UserUpdateMe;
