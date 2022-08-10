import { userAPI } from "apis";
import { Button } from "components/button";
import { FormGroup, FormLabel, FormMessError } from "components/form";
import { InputV2 } from "components/input";
import { UserProfileYup } from "constants/yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useStore } from "store/configStore";
import Administrative from "./UserUpdateAdministrative";

interface IValuesUpdateProfile {
  fullname: string;
  phone: string;
  addressHome: string;
  addressAdministrative: string;
}

const UserUpdateProfile = () => {
  const { currentUser, setCurrentUser } = useStore((state) => state);
  const updateProfile = async (values: any) => {
    try {
      const { data, success, message } = await userAPI.updateProfileMe(values);
      if (success) {
        const newCurrentUser = { ...currentUser, ...data };
        setCurrentUser(newCurrentUser);
        toast.success(message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleUpdateProfile = (values: IValuesUpdateProfile) => {
    updateProfile(values);
  };

  const formik = useFormik({
    initialValues: {
      fullname: currentUser.fullname || "",
      phone: currentUser.phone || "",
      addressHome: currentUser.addressHome || "",
      addressAdministrative: currentUser.addressAdministrative || "",
    },
    validationSchema: UserProfileYup,
    onSubmit: (values) => {
      handleUpdateProfile(values);
    },
  });

  return (
    <form className='lg:w-2/3' onSubmit={formik.handleSubmit} autoComplete='off'>
      <FormGroup>
        <FormLabel htmlFor='email'>Email</FormLabel>
        <span>{currentUser?.email}</span>
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
          Địa chỉ: {currentUser.addressAdministrative}
        </FormLabel>
        <Administrative formik={formik} />
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
      <Button type='submit' primary className='w-full h-10'>
        Lưu
      </Button>
    </form>
  );
};

export default UserUpdateProfile;
