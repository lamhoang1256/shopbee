import { voucherAPI } from "apis";
import Button from "components/Button";
import Switch from "components/Switch";
import Label from "components/Label";
import FormError from "components/FormError";
import FormGroup from "components/FormGroup";
import Input from "components/Input";
import { useFormik } from "formik";
import Template from "layouts/Template";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { formatDateTimeLocal, initialValuesVoucher, voucherRules } from "utils";
import VoucherItem from "modules/Voucher/VoucherItem";
import { IPayloadVoucher } from "@types";
import { useMutation } from "react-query";

const VoucherAddNew = () => {
  const addVoucherMutation = useMutation({
    mutationFn: (payload: IPayloadVoucher) => voucherAPI.addNewVoucher(payload)
  });
  const formik = useFormik({
    initialValues: initialValuesVoucher,
    validationSchema: voucherRules,
    onSubmit: async (values, { setErrors }) => {
      addVoucherMutation.mutate(values, {
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
  return (
    <Template title="Thêm mới voucher" desc="Vui lòng nhập đầy đủ thông tin voucher">
      <Helmet>
        <title>Thêm mới voucher</title>
      </Helmet>
      <div className="flex flex-col-reverse gap-8 mt-6 lg:flex-row">
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
            Lưu
          </Button>
        </form>
        <div className="flex-1">
          <FormGroup>
            <Label htmlFor="voucher">Preview</Label>
            <VoucherItem
              title={values.title}
              code={values.code}
              isFreeship={values.isFreeship}
              expirationDate={values.expirationDate}
              className="max-w-[460px]"
            />
          </FormGroup>
        </div>
      </div>
    </Template>
  );
};

export default VoucherAddNew;
