import { userAPI } from "apis";
import { Button } from "components/button";
import { Administrative } from "components/administrative";
import { FormGroup, Label, MessageError } from "components/form";
import { Input } from "components/input";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useStore } from "store/globalStore";

const UserUpdateMe = () => {
  const { currentUser, setCurrentUser } = useStore((state) => state);
  const formik = useFormik({
    initialValues: {
      fullname: "",
      phone: "",
      street: "",
      address: "",
      city: { id: "", name: "" },
      district: { id: "", name: "" },
      ward: { id: "", name: "" },
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
      console.log("values: ", values);
      return;
      try {
        const { street, city, district, ward } = values;
        const address = `${street}, ${ward.name}, ${district.name}, ${city.name}`;
        const { data, message } = await userAPI.updateMe({ ...values, address });
        setCurrentUser({ ...currentUser, ...data });
        toast.success(message);
      } catch (error) {
        toast.error(error?.message);
      }
    },
  });
  console.log("values ", formik.values);
  console.log("errors ", formik.errors);

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const { data } = await userAPI.getSingleUser(currentUser?._id);
        formik.resetForm({ values: data });
      } catch (error) {
        toast.error(error?.message);
      }
    };
    fetchDataUser();
  }, [currentUser?._id]);

  return (
    <form className='w-full max-w-[600px]' onSubmit={formik.handleSubmit} autoComplete='off'>
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
        <Administrative formik={formik} />
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
