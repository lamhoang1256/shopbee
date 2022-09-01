import { shopAPI } from "apis";
import { Button } from "components/button";
import { UpdateAdministrative } from "components/common";
import { FormGroup, Label, MessageError } from "components/form";
import { Input } from "components/input";
import * as Yup from "yup";
import { useFormik } from "formik";
import useFetchShopInfo from "hooks/useFetchShopInfo";
import { Template } from "layouts";
import { UserChangeAvatar } from "modules/user";
import { ChangeEvent, useEffect } from "react";
import { toast } from "react-toastify";
import { uploadImage } from "utils/uploadImage";

const ShopUpdate = () => {
  const { shopInfo } = useFetchShopInfo();
  const formik = useFormik({
    initialValues: {
      name: "",
      avatar: "",
      street: "",
      address: "",
      city: { id: "", name: "" },
      district: { id: "", name: "" },
      ward: { id: "", name: "" },
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập tên shop!"),
      street: Yup.string().required("Vui lòng nhập địa chỉ lấy hàng!"),
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
    onSubmit: async (values: any) => {
      try {
        const { street, city, district, ward } = values;
        const address = `${street}, ${ward.name}, ${district.name}, ${city.name}`;
        const { message } = await shopAPI.updateShopInfo({ ...values, address });
        toast.success(message);
      } catch (error) {
        toast.error(error?.message);
      }
    },
  });
  const handleChangeAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const newAvatarUrl = await uploadImage(e);
      const { message, data } = await shopAPI.updateShopInfo({ avatar: newAvatarUrl });
      formik.setFieldValue("avatar", data?.avatar);
      toast.success(message);
    } catch (error) {
      toast.error(error?.message);
    }
  };
  useEffect(() => {
    if (shopInfo?.name) formik.resetForm({ values: shopInfo });
  }, [shopInfo]);

  return (
    <Template title='Quản lí thông tin shop' desc='Vui lòng nhập đầy đủ thông tin shop'>
      <form
        autoComplete='off'
        onSubmit={formik.handleSubmit}
        className='flex flex-col-reverse gap-8 mt-6 lg:flex-row'
      >
        <div className='max-w-[600px]'>
          <FormGroup>
            <Label htmlFor='name'>Tên shop:</Label>
            <Input name='name' value={formik.values.name} onChange={formik.handleChange} />
            <MessageError>{formik.touched.address && formik.errors?.address}</MessageError>
          </FormGroup>
          <FormGroup className='mb-0'>
            <Label htmlFor='address'>Địa chỉ shop:</Label>
            <UpdateAdministrative formik={formik} />
            <MessageError>{formik.touched.address && formik.errors?.address}</MessageError>
          </FormGroup>
          <FormGroup>
            <Label htmlFor='street'>Địa chỉ lấy hàng cụ thể</Label>
            <Input name='street' value={formik.values.street} onChange={formik.handleChange} />
            <MessageError>{formik.touched.street && formik.errors?.street}</MessageError>
          </FormGroup>
          <Button type='submit' primary className='w-full h-10'>
            Lưu
          </Button>
        </div>
        <UserChangeAvatar avatar={formik.values.avatar} handleChangeAvatar={handleChangeAvatar} />
      </form>
    </Template>
  );
};

export default ShopUpdate;
