import { IPayloadVoucher } from "@types";
import { voucherAPI } from "apis";
import Button from "components/Button";
import FormError from "components/FormError";
import FormGroup from "components/FormGroup";
import Input from "components/Input";
import Label from "components/Label";
import Switch from "components/Switch";
import { useFormik } from "formik";
import Template from "layouts/Template";
import VoucherItem from "modules/Voucher/VoucherItem";
import { Helmet } from "react-helmet-async";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { formatDateTimeLocal, initialValuesVoucher, voucherRules } from "utils";

const VoucherUpdate = () => {
  const { id = "" } = useParams();
  const updateVoucherMutation = useMutation({
    mutationFn: (payload: IPayloadVoucher) => voucherAPI.updateVoucher(id, payload)
  });
  const formik = useFormik({
    initialValues: initialValuesVoucher,
    validationSchema: voucherRules,
    onSubmit: async (values, { setErrors }) => {
      updateVoucherMutation.mutate(values, {
        onSuccess: ({ message }) => {
          toast.success(message);
        },
        onError(error: any) {
          toast.error(error?.message);
          setErrors(error.error);
        }
      });
    }
  });
  const { values, touched, errors, setFieldValue, handleSubmit, handleChange } = formik;
  const handleChangeExpirationDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const expirationDate = new Date(e.target.value).getTime();
    setFieldValue("expirationDate", expirationDate);
  };
  useQuery({
    queryKey: ["voucher", id],
    queryFn: () => voucherAPI.getSingleVoucher(id),
    staleTime: 5 * 60 * 1000,
    onSuccess({ data }) {
      formik.resetForm({ values: data });
    }
  });
  return (
    <Template title="Chỉnh sửa thông tin voucher" desc="Vui lòng nhập đầy đủ thông tin voucher">
      <Helmet>
        <title>Cập nhật voucher</title>
      </Helmet>
      <form className="flex flex-col-reverse gap-8 mt-6 lg:flex-row">
        <form autoComplete="off" onSubmit={handleSubmit} className="max-w-[600px]">
          <FormGroup>
            <Label htmlFor="title">Tên mã giảm giá</Label>
            <Input name="title" value={values.title} onChange={handleChange} />
            <FormError>{touched.title && errors?.title}</FormError>
          </FormGroup>
          <div className="grid gap-2 lg:grid-cols-2">
            <FormGroup>
              <Label htmlFor="code">Mã code</Label>
              <Input name="code" value={values.code} onChange={handleChange} />
              <FormError>{touched.code && errors?.code}</FormError>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="value">Giá trị</Label>
              <Input name="value" type="number" value={values.value} onChange={handleChange} />
              <FormError>{touched.value && errors?.value}</FormError>
            </FormGroup>
          </div>
          <FormGroup>
            <Label htmlFor="code">Hạn sử dụng</Label>
            <Input
              name="expirationDate"
              type="datetime-local"
              value={formatDateTimeLocal(values.expirationDate)}
              onChange={handleChangeExpirationDate}
            />
          </FormGroup>
          <div className="grid gap-2 lg:grid-cols-2">
            <FormGroup>
              <Label htmlFor="isPublic">Mã công khai</Label>
              <Switch
                name="isPublic"
                checked={values.isPublic}
                handleOnChangeSwitch={(checked) => setFieldValue("isPublic", checked)}
              />
              <FormError>{touched.isPublic && errors?.isPublic}</FormError>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="isFreeship">Mã freeship</Label>
              <Switch
                name="isFreeship"
                checked={values.isFreeship}
                handleOnChangeSwitch={(checked) => setFieldValue("isFreeship", checked)}
              />
              <FormError>{touched.isFreeship && errors?.isFreeship}</FormError>
            </FormGroup>
          </div>
          <Button type="submit" primary className="w-full h-10">
            Cập nhật
          </Button>
        </form>
        <div className="flex-1">
          <FormGroup>
            <Label htmlFor="voucher">Preview</Label>
            <VoucherItem
              className="max-w-[460px]"
              title={values.title}
              code={values.code}
              isFreeship={values.isFreeship}
              expirationDate={values.expirationDate}
            />
          </FormGroup>
        </div>
      </form>
    </Template>
  );
};

export default VoucherUpdate;
