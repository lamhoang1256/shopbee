import { addressAPI } from "apis";
import { Button } from "components/button";
import { UpdateAdministrative } from "components/common";
import { FormGroup, FormLabel, FormMessError } from "components/form";
import { InputV2 } from "components/input";
import { AddressSchemaYup } from "constants/yup";
import { useFormik } from "formik";
import { HeaderTemplate } from "layouts";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

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
          <FormLabel htmlFor='addressAdministrative'>Địa chỉ:</FormLabel>
          <UpdateAdministrative formik={formik} />
          <FormMessError>
            {formik.touched.addressAdministrative && formik.errors?.addressAdministrative}
          </FormMessError>
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor='addressDetail'>Địa chỉ lấy hàng cụ thể</FormLabel>
          <InputV2
            name='addressDetail'
            type='text'
            value={formik.values.addressDetail}
            onChange={formik.handleChange}
          />
          <FormMessError>
            {formik.touched.addressDetail && formik.errors?.addressDetail}
          </FormMessError>
        </FormGroup>
        <Button type='submit' primary className='w-full h-10'>
          Lưu
        </Button>
      </form>
    </HeaderTemplate>
  );
};

export default ShopAddressUpdate;
