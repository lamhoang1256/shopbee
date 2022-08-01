import { FormLabel, FormMessError } from "components/form";
import { InputV2 } from "components/input";
import { UserProfileYup } from "constants/yup";
import { useFormik } from "formik";
import { ProfileGroup } from "modules/profile";
import { useStore } from "store/configStore";
import UserUpdateProvince from "./UserUpdateProvince";

interface IValuesUpdateProfile {
  fullname: string;
  phone: string;
  addressHome: string;
  administrative: string;
}

const UserUpdateProfile = () => {
  const currentUser = useStore((state: any) => state.currentUser);
  const handleUpdateProfile = (values: IValuesUpdateProfile) => {
    const body = {
      _id: currentUser?._id,
      fullname: values.fullname,
      phone: values.phone,
      address: `${values?.addressHome}, ${values?.administrative}`,
    };
    console.log("body: ", body);
  };

  const formik = useFormik({
    initialValues: {
      fullname: "",
      phone: "",
      addressHome: "",
      administrative: "",
    },
    validationSchema: UserProfileYup,
    onSubmit: (values) => {
      handleUpdateProfile(values);
    },
  });

  return (
    <form className='lg:w-2/3' onSubmit={formik.handleSubmit}>
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
        <FormLabel htmlFor='administrative'>Tỉnh/ Thành phố, Quận/Huyện, Phường/Xã</FormLabel>
        <UserUpdateProvince formik={formik} />
        <FormMessError>
          {formik.touched.administrative && formik.errors?.administrative}
        </FormMessError>
      </ProfileGroup>
      <ProfileGroup>
        <FormLabel htmlFor='addressHome'>Địa chỉ</FormLabel>
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
