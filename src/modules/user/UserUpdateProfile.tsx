import { configAPI } from "apis/configAPI";
import { FormLabel, FormMessError } from "components/form";
import { InputV2 } from "components/input";
import { UserProfileYup } from "constants/yup";
import { useFormik } from "formik";
import { ICurrentUser } from "interfaces";
import { ProfileGroup } from "modules/profile";
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
  const currentUser: ICurrentUser = useStore((state: any) => state.currentUser);
  const updateProfile = async (values: any) => {
    try {
      const { success, message } = await configAPI.userUpdateProfile(values);
      if (success) toast.success(message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateProfile = (values: IValuesUpdateProfile) => {
    const body = {
      _id: currentUser?._id,
      fullname: values.fullname,
      phone: values.phone,
      addressHome: values?.addressHome,
      addressAdministrative: values?.addressAdministrative,
    };
    updateProfile(body);
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
      <ProfileGroup>
        <FormLabel htmlFor='email'>Email</FormLabel>
        <span>lamhoang@gmail.com</span>
      </ProfileGroup>
      <ProfileGroup>
        <FormLabel htmlFor='fullname'>Họ và tên</FormLabel>
        <InputV2
          name='fullname'
          type='text'
          value={formik.values.fullname}
          onChange={formik.handleChange}
        />
        <FormMessError>{formik.touched.fullname && formik.errors?.fullname}</FormMessError>
      </ProfileGroup>
      <ProfileGroup>
        <FormLabel htmlFor='phone'>Số điện thoại</FormLabel>
        <InputV2
          name='phone'
          type='text'
          value={formik.values.phone}
          onChange={formik.handleChange}
        />
        <FormMessError>{formik.touched.phone && formik.errors?.phone}</FormMessError>
      </ProfileGroup>
      <ProfileGroup>
        <FormLabel htmlFor='addressAdministrative'>
          Địa chỉ: {currentUser.addressAdministrative}
        </FormLabel>
        <Administrative formik={formik} />
        <FormMessError>
          {formik.touched.addressAdministrative && formik.errors?.addressAdministrative}
        </FormMessError>
      </ProfileGroup>
      <ProfileGroup>
        <FormLabel htmlFor='addressHome'>Địa chỉ nhận hàng cụ thể</FormLabel>
        <InputV2
          name='addressHome'
          type='text'
          value={formik.values.addressHome}
          onChange={formik.handleChange}
        />
        <FormMessError>{formik.touched.addressHome && formik.errors?.addressHome}</FormMessError>
      </ProfileGroup>
      <button type='submit' className='w-full h-10 mt-2 text-white rounded bg-orangeee4'>
        Lưu
      </button>
    </form>
  );
};

export default UserUpdateProfile;
