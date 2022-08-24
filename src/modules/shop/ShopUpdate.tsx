import { shopAPI } from "apis";
import { Button } from "components/button";
import { UpdateAdministrative } from "components/common";
import { FormGroup, Label, MessageError } from "components/form";
import { Input } from "components/input";
import { shopSchema } from "constants/yup";
import { useFormik } from "formik";
import { Template } from "layouts";
import { UserChangeAvatar } from "modules/user";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { uploadImage } from "utils/uploadImage";

const ShopUpdate = () => {
  const formik = useFormik({
    initialValues: {
      _id: "",
      name: "",
      avatar: "",
      street: "",
      address: "",
      city: { id: "", name: "" },
      district: { id: "", name: "" },
      ward: { id: "", name: "" },
    },
    validationSchema: shopSchema,
    onSubmit: async (values: any) => {
      const payload = values;
      const { street, city, district, ward } = values;
      payload.address = `${street}, ${ward.name}, ${district.name}, ${city.name}`;
      try {
        const { message } = await shopAPI.updateShopInfo(formik.values._id, payload);
        toast.success(message);
      } catch (error: any) {
        toast.error(error?.message);
      }
    },
  });

  const fetchShopInfo = async () => {
    try {
      const { data } = await shopAPI.getShopInfo();
      formik.resetForm({ values: data });
    } catch (error) {
      console.log("Failed to fetch address: ", error);
    }
  };

  const handleChangeAvatar = async (e: any) => {
    try {
      const avatar = await uploadImage(e);
      const { message, data } = await shopAPI.updateShopInfo(formik.values._id, {
        avatar,
      });
      formik.setFieldValue("avatar", data?.avatar);
      toast.success(message);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    fetchShopInfo();
  }, []);

  return (
    <Template
      label='Quản lí thông tin shop'
      desc='Vui lòng nhập đầy đủ thông tin cho sản phẩm của bạn'
    >
      <div className='flex flex-col-reverse gap-8 mt-6 lg:flex-row'>
        <form className='max-w-[600px]' onSubmit={formik.handleSubmit} autoComplete='off'>
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
        </form>
        <UserChangeAvatar avatar={formik.values.avatar} handleChangeAvatar={handleChangeAvatar} />
      </div>
    </Template>
  );
};

export default ShopUpdate;
