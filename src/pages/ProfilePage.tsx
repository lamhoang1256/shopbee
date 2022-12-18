import { IPayloadUpdateMe } from "@types";
import { userAPI } from "apis";
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
import { useStore } from "store/globalStore";
import { generateAddress, initialValuesUpdateUser, userUpdateRules } from "utils";
import { uploadImage } from "utils/uploadImage";

const ProfilePage = () => {
  const { currentUser, setCurrentUser } = useStore((state) => state);
  const updateMeMutation = useMutation({
    mutationFn: (payload: Omit<IPayloadUpdateMe, "password">) => userAPI.updateMe(payload)
  });
  const formik = useFormik({
    initialValues: initialValuesUpdateUser,
    validationSchema: userUpdateRules,
    onSubmit: async (values, { setErrors }) => {
      const address = generateAddress(values);
      const payload = { ...values, address };
      updateMeMutation.mutate(payload, {
        onSuccess: ({ message, data }) => {
          toast.success(message);
          setCurrentUser({ ...currentUser, ...data });
        },
        onError(error: any) {
          toast.error(error?.message);
          setErrors(error.error);
        }
      });
    }
  });
  const { values, touched, errors, setFieldValue, handleSubmit, handleChange } = formik;
  useQuery({
    queryKey: ["user", currentUser._id],
    queryFn: () => userAPI.getSingleUser(currentUser._id),
    staleTime: 5 * 60 * 1000,
    onSuccess({ data }) {
      formik.resetForm({ values: data });
    }
  });
  const updateAvatarMutation = useMutation({
    mutationFn: (avatarUrl: string) => userAPI.updateMe({ avatar: avatarUrl })
  });
  const handleChangeAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    const newAvatarUrl = await uploadImage(e);
    updateAvatarMutation.mutate(newAvatarUrl, {
      onSuccess({ data, message }) {
        setFieldValue("avatar", data?.avatar);
        const newCurrentUser = { ...currentUser, ...data };
        setCurrentUser(newCurrentUser);
        toast.success(message);
      },
      onError(error: any) {
        toast.error(error?.message);
      }
    });
  };
  return (
    <Template title="Hồ sơ của tôi" desc="Quản lý thông tin hồ sơ để bảo mật tài khoản">
      <Helmet>
        <title>Hồ sơ của tôi</title>
      </Helmet>
      <div className="flex flex-col-reverse gap-8 mt-6 lg:flex-row">
        <form className="w-full max-w-[600px]" onSubmit={handleSubmit} autoComplete="off">
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <span>{currentUser?.email}</span>
          </FormGroup>
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
          <Button type="submit" primary className="w-full h-10">
            Lưu
          </Button>
        </form>
        <UserUploadAvatar avatar={currentUser.avatar} onChangeAvatar={handleChangeAvatar} />
      </div>
    </Template>
  );
};

export default ProfilePage;
