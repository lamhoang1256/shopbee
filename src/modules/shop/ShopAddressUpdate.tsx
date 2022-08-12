import { IShopAddress } from "@types";
import { addressAPI } from "apis";
import { Button } from "components/button";
import { FormGroup, FormLabel, FormMessError } from "components/form";
import { InputV2 } from "components/input";
import { AddressYup } from "constants/yup";
import { useFormik } from "formik";
import { HeaderTemplate } from "layouts";
import { UserUpdateAdministrative } from "modules/user";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "store/configStore";

const ShopAddressUpdate = () => {
  const { id } = useParams();
  const { currentUser } = useStore((state) => state);

  const handleUpdateShopAddress = async (values: Partial<IShopAddress>) => {
    try {
      const { success, message } = await addressAPI.updateShopAddress(values, id || "");
      if (success) toast.success(message);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      addressDetail: "",
      addressAdministrative: "",
      addressIdProvince: "",
      addressIdDistrict: "",
      addressIdCommune: "",
      settingDefault: false,
    },
    validationSchema: AddressYup,
    onSubmit: (values) => {
      handleUpdateShopAddress(values);
    },
  });

  const fetchData = async () => {
    try {
      const { success, data } = await addressAPI.getSingleShopAddress(id || "");
      if (success) {
        formik.resetForm({
          values: data,
        });
      }
    } catch (error) {
      console.log("Failed to fetch address: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <HeaderTemplate
      label='Cập nhật địa chỉ shop'
      desc='Vui lòng nhập đầy đủ thông tin cho sản phẩm của bạn'
    >
      <form className='lg:w-2/3' onSubmit={formik.handleSubmit} autoComplete='off'>
        <FormGroup>
          <FormLabel htmlFor='addressAdministrative'>
            Địa chỉ: {currentUser.addressAdministrative}
          </FormLabel>
          <UserUpdateAdministrative formik={formik} />
          <FormMessError>
            {formik.touched.addressAdministrative && formik.errors?.addressAdministrative}
          </FormMessError>
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor='addressDetail'>Địa chỉ lấy hàng/ trả hàng</FormLabel>
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
