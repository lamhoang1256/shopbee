import { shopAPI } from "apis";
import Administrative from "components/Administrative";
import Button from "components/Button";
import FormError from "components/FormError";
import FormGroup from "components/FormGroup";
import Input from "components/Input";
import Label from "components/Label";
import { useFormik } from "formik";
import Template from "layouts/Template";
import UserUploadAvatar from "modules/User/UserUploadAvatar";
import { ChangeEvent } from "react";
import { Helmet } from "react-helmet-async";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { generateAddress, initialValuesShopInfo, shopInfoRules, uploadImage } from "utils";

const ShopUpdate = () => {
  const updateShopInfoMutation = useMutation({
    mutationFn: (payload: typeof initialValuesShopInfo) => shopAPI.updateShopInfo(payload)
  });
  const formik = useFormik({
    initialValues: initialValuesShopInfo,
    validationSchema: shopInfoRules,
    onSubmit: async (values, { setErrors }) => {
      const address = generateAddress(values);
      const payload = { ...values, address };
      updateShopInfoMutation.mutate(payload, {
        onSuccess: ({ message }) => {
          toast.success(message);
        },
        onError(error: any) {
          setErrors(error.error);
        }
      });
    }
  });
  const { values, touched, errors, setFieldValue, handleSubmit, handleChange } = formik;
  useQuery({
    queryKey: ["shopinfo"],
    queryFn: () => shopAPI.getShopInfo(),
    staleTime: 5 * 60 * 1000,
    onSuccess({ data }) {
      formik.resetForm({ values: data });
    }
  });
  const updateAvatarMutation = useMutation({
    mutationFn: (avatarUrl: string) => shopAPI.updateShopInfo({ avatar: avatarUrl })
  });
  const handleChangeAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    const newAvatarUrl = await uploadImage(e);
    updateAvatarMutation.mutate(newAvatarUrl, {
      onSuccess({ data }) {
        setFieldValue("avatar", data?.avatar);
        toast.success(data?.message);
      },
      onError(error: any) {
        toast.error(error?.message);
      }
    });
  };
  return (
    <Template title="Quản lí thông tin shop" desc="Vui lòng nhập đầy đủ thông tin shop">
      <Helmet>
        <title>Cập nhật thông tin shop</title>
      </Helmet>
      <div className="flex flex-col-reverse gap-8 mt-6 lg:flex-row">
        <form autoComplete="off" className="max-w-[600px] w-full" onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Tên shop:</Label>
            <Input name="name" value={values.name} onChange={handleChange} />
            <FormError>{touched.address && errors?.address}</FormError>
          </FormGroup>
          <FormGroup className="mb-0">
            <Label htmlFor="address">Địa chỉ shop:</Label>
            <Administrative formik={formik} />
            <FormError>{touched.address && errors?.address}</FormError>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="street">Địa chỉ lấy hàng cụ thể</Label>
            <Input name="street" value={values.street} onChange={handleChange} />
            <FormError>{touched.street && errors?.street}</FormError>
          </FormGroup>
          <Button type="submit" primary className="w-full h-10">
            Lưu
          </Button>
        </form>
        <UserUploadAvatar avatar={values.avatar} onChangeAvatar={handleChangeAvatar} />
      </div>
    </Template>
  );
};

export default ShopUpdate;
