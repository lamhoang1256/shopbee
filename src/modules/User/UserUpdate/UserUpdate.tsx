import { userAPI } from "apis";
import Administrative from "components/Administrative";
import Button from "components/Button";
import FormError from "components/FormError";
import FormGroup from "components/FormGroup";
import Input from "components/Input";
import Label from "components/Label";
import Switch from "components/Switch";
import { useFormik } from "formik";
import Template from "layouts/Template";
import UserUploadAvatar from "modules/User/UserUploadAvatar";
import { ChangeEvent } from "react";
import { Helmet } from "react-helmet-async";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { initialValuesUpdateUser, userRules, uploadImage, generateAddress } from "utils";

const userUpdateRules = userRules.pick(["fullname", "phone", "street", "city", "district", "ward"]);
const UserUpdate = () => {
  const { id = "" } = useParams();
  const updateUserMutation = useMutation({
    mutationFn: (payload: typeof initialValuesUpdateUser) => userAPI.updateUser(id, payload)
  });
  const formik = useFormik({
    initialValues: initialValuesUpdateUser,
    validationSchema: userUpdateRules,
    onSubmit: async (values, { setErrors }) => {
      const address = generateAddress(values);
      const payload = { ...values, address };
      updateUserMutation.mutate(payload, {
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
  const updateAvatarMutation = useMutation({
    mutationFn: (avatarUrl: string) => userAPI.updateMe({ avatar: avatarUrl })
  });
  const handleChangeAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    const newAvatarUrl = await uploadImage(e);
    updateAvatarMutation.mutate(newAvatarUrl, {
      onSuccess(data) {
        setFieldValue("avatar", data?.avatar);
        toast.success(data?.message);
      },
      onError(error: any) {
        toast.error(error?.message);
      }
    });
  };
  useQuery({
    queryKey: ["user", id],
    queryFn: () => userAPI.getSingleUser(id),
    staleTime: 5 * 60 * 1000,
    onSuccess({ data }) {
      formik.resetForm({ values: data });
    }
  });
  return (
    <Template
      title="Chỉnh sửa thông tin người dùng"
      desc="Vui lòng nhập đầy đủ thông tin cho sản phẩm của bạn"
    >
      <Helmet>
        <title>Cập nhật người dùng</title>
      </Helmet>
      <div className="flex flex-col-reverse gap-8 mt-6 lg:flex-row">
        <form className="max-w-[600px] w-full" onSubmit={handleSubmit} autoComplete="off">
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input name="email" value={values.email} onChange={handleChange} />
            <FormError>{touched.email && errors?.email}</FormError>
          </FormGroup>
          <div className="grid gap-2 lg:grid-cols-2">
            <FormGroup>
              <Label htmlFor="fullname">Họ và tên</Label>
              <Input name="fullname" value={values.fullname} onChange={handleChange} />
              <FormError>{touched.fullname && errors?.fullname}</FormError>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input name="phone" value={values.phone} onChange={handleChange} />
              <FormError>{touched.phone && errors?.phone}</FormError>
            </FormGroup>
          </div>
          <FormGroup className="mb-0">
            <Label htmlFor="address">Địa chỉ:</Label>
            <Administrative formik={formik} />
            <FormError>{touched.address && errors?.address}</FormError>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="street">Địa chỉ nhận hàng cụ thể</Label>
            <Input name="street" value={values.street} onChange={handleChange} />
            <FormError>{touched.street && errors?.street}</FormError>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="isAdmin">Quyền quản trị (Admin)</Label>
            <Switch
              name="isAdmin"
              checked={values.isAdmin}
              handleOnChangeSwitch={(checked) => setFieldValue("isAdmin", checked)}
            />
            <FormError>{touched.isAdmin && errors?.isAdmin}</FormError>
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

export default UserUpdate;
