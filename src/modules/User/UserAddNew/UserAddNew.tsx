import { userAPI } from "apis";
import Administrative from "components/Administrative";
import Button from "components/Button";
import FormError from "components/FormError";
import FormGroup from "components/FormGroup";
import Input from "components/Input";
import InputPassword from "components/InputPassword";
import Label from "components/Label";
import Switch from "components/Switch";
import { useFormik } from "formik";
import Template from "layouts/Template";
import { ChangeEvent } from "react";
import { Helmet } from "react-helmet-async";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { generateAddress, initialValuesUser, uploadImage, userRules } from "utils";
import UserUploadAvatar from "../UserUploadAvatar";

const UserAddNew = () => {
  const addUserMutation = useMutation({
    mutationFn: (payload: typeof initialValuesUser) => userAPI.addNewUser(payload)
  });
  const formik = useFormik({
    initialValues: initialValuesUser,
    validationSchema: userRules,
    onSubmit: async (values, { setErrors }) => {
      const address = generateAddress(values);
      const payload = { ...values, address };
      addUserMutation.mutate(payload, {
        onSuccess: ({ message }) => {
          toast.success(message);
        },
        onError(error: any) {
          setErrors(error.error);
        }
      });
    }
  });
  const { values, touched, errors, setFieldValue, handleChange } = formik;
  const handleUploadAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    const avatar = await uploadImage(e);
    setFieldValue("avatar", avatar);
  };
  return (
    <Template title="Thêm người dùng mới" desc="Vui lòng nhập đầy đủ thông tin của người dùng">
      <Helmet>
        <title>Thêm người dùng mới</title>
      </Helmet>
      <div className="flex flex-col-reverse gap-8 mt-6 lg:flex-row">
        <form className="max-w-[600px]" onSubmit={formik.handleSubmit} autoComplete="off">
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input name="email" value={values.email} onChange={formik.handleChange} />
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
          <div className="grid gap-2 lg:grid-cols-2">
            <FormGroup>
              <Label htmlFor="password">Mật khẩu</Label>
              <InputPassword name="password" value={values.password} onChange={handleChange} />
              <FormError>{touched.password && errors?.password}</FormError>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="confirm_password">Xác nhận mật khẩu</Label>
              <InputPassword
                name="confirm_password"
                value={values.confirm_password}
                onChange={handleChange}
              />
              <FormError>{touched.confirm_password && errors?.confirm_password}</FormError>
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
              handleOnChangeSwitch={(checked) => {
                setFieldValue("isAdmin", checked);
              }}
            />
            <FormError>{touched.isAdmin && errors?.isAdmin}</FormError>
          </FormGroup>
          <Button type="submit" primary className="w-full h-10">
            Lưu
          </Button>
        </form>
        <UserUploadAvatar avatar={values.avatar} onChangeAvatar={handleUploadAvatar} />
      </div>
    </Template>
  );
};

export default UserAddNew;
