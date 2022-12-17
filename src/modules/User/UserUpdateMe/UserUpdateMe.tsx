import { userAPI } from "apis";
import Administrative from "components/Administrative";
import Button from "components/Button";
import FormError from "components/FormError";
import FormGroup from "components/FormGroup";
import Input from "components/Input";
import Label from "components/Label";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { useStore } from "store/globalStore";
import { generateAddress, initialValuesUpdateUser, userRules } from "utils";

const userUpdateRules = userRules.pick(["fullname", "phone", "street", "city", "district", "ward"]);
const UserUpdateMe = () => {
  const { currentUser, setCurrentUser } = useStore((state) => state);
  const updateMeMutation = useMutation({
    mutationFn: (payload: typeof initialValuesUpdateUser) => userAPI.updateMe(payload)
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
          toast.success(error?.message);
          setErrors(error.error);
        }
      });
    }
  });
  useQuery({
    queryKey: ["user", currentUser._id],
    queryFn: () => userAPI.getSingleUser(currentUser._id),
    staleTime: 5 * 60 * 1000,
    onSuccess({ data }) {
      formik.resetForm({ values: data });
    }
  });
  return (
    <form className="w-full max-w-[600px]" onSubmit={formik.handleSubmit} autoComplete="off">
      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <span>{currentUser?.email}</span>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="fullname">Họ và tên</Label>
        <Input name="fullname" value={formik.values.fullname} onChange={formik.handleChange} />
        <FormError>{formik.touched.fullname && formik.errors?.fullname}</FormError>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="phone">Số điện thoại</Label>
        <Input name="phone" value={formik.values.phone} onChange={formik.handleChange} />
        <FormError>{formik.touched.phone && formik.errors?.phone}</FormError>
      </FormGroup>
      <FormGroup className="mb-0">
        <Label htmlFor="address">Địa chỉ:</Label>
        <Administrative formik={formik} />
        <FormError>{formik.touched.address && formik.errors?.address}</FormError>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="street">Địa chỉ nhận hàng cụ thể</Label>
        <Input name="street" value={formik.values.street} onChange={formik.handleChange} />
        <FormError>{formik.touched.street && formik.errors?.street}</FormError>
      </FormGroup>
      <Button type="submit" primary className="w-full h-10">
        Lưu
      </Button>
    </form>
  );
};

export default UserUpdateMe;
