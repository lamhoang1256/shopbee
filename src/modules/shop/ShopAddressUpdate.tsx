import { useEffect } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addressAPI } from "apis";
import { HeaderTemplate } from "layouts";
import { AddressSchemaYup } from "constants/yup";
import { Button } from "components/button";
import { UpdateAdministrative } from "components/common";
import { FormGroup, Label, MessageError } from "components/form";
import { Input } from "components/input";

const ShopAddressUpdate = () => {
  const { id = "" } = useParams();
  const formik = useFormik({
    initialValues: {
      addressDetail: "",
      addressAdministrative: "",
      addressIdProvince: "",
      addressIdDistrict: "",
      addressIdCommune: "",
    },
    validationSchema: AddressSchemaYup,
    onSubmit: async (values) => {
      try {
        const { success, message } = await addressAPI.updateShopAddress(values, id);
        if (success) toast.success(message);
      } catch (error: any) {
        toast.error(error?.message);
      }
    },
  });

  useEffect(() => {
    const fetchAddressNeedUpdate = async () => {
      try {
        const { data } = await addressAPI.getSingleShopAddress(id || "");
        formik.resetForm({
          values: data,
        });
      } catch (error) {
        console.log("Failed to fetch address: ", error);
      }
    };
    fetchAddressNeedUpdate();
  }, [id]);

  return (
    <HeaderTemplate
      label='Cập nhật địa chỉ shop'
      desc='Vui lòng nhập đầy đủ thông tin cho sản phẩm của bạn'
    >
      <form className='lg:w-2/3' onSubmit={formik.handleSubmit} autoComplete='off'>
        <FormGroup>
          <Label htmlFor='addressAdministrative'>Địa chỉ:</Label>
          <UpdateAdministrative formik={formik} />
          <MessageError>
            {formik.touched.addressAdministrative && formik.errors?.addressAdministrative}
          </MessageError>
        </FormGroup>
        <FormGroup>
          <Label htmlFor='addressDetail'>Địa chỉ lấy hàng cụ thể</Label>
          <Input
            type='text'
            name='addressDetail'
            value={formik.values.addressDetail}
            onChange={formik.handleChange}
          />
          <MessageError>
            {formik.touched.addressDetail && formik.errors?.addressDetail}
          </MessageError>
        </FormGroup>
        <Button type='submit' primary className='w-full h-10'>
          Lưu
        </Button>
      </form>
    </HeaderTemplate>
  );
};

export default ShopAddressUpdate;
