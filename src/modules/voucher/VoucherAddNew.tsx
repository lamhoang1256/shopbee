import { voucherAPI } from "apis";
import Button from "components/Button";
import { Switch } from "components/_checkbox";
import Label from "components/Label";
import FormError from "components/FormError";
import FormGroup from "components/FormGroup";
import Input from "components/Input";
import { useFormik } from "formik";
import Template from "layouts/Template";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import VoucherItem from "./VoucherItem";

const VoucherAddNew = () => {
  const formik = useFormik({
    initialValues: {
      code: "",
      title: "",
      expirationDate: 0,
      value: 0,
      isPublic: true,
      isFreeship: false
    },
    onSubmit: async (values) => {
      try {
        const expirationDate = new Date(values.expirationDate).getTime();
        const { message } = await voucherAPI.addNewVoucher({ ...values, expirationDate });
        toast.success(message);
      } catch (error) {
        toast.error(error?.message);
      }
    }
  });

  return (
    <Template title="Thêm mới voucher" desc="Vui lòng nhập đầy đủ thông tin voucher">
      <Helmet>
        <title>Thêm mới voucher</title>
      </Helmet>
      <form
        autoComplete="off"
        onSubmit={formik.handleSubmit}
        className="flex flex-col-reverse gap-8 mt-6 lg:flex-row"
      >
        <div className="max-w-[600px]">
          <FormGroup>
            <Label htmlFor="title">Tên mã giảm giá</Label>
            <Input name="title" value={formik.values.title} onChange={formik.handleChange} />
            <FormError>{formik.touched.title && formik.errors?.title}</FormError>
          </FormGroup>
          <div className="grid gap-2 lg:grid-cols-2">
            <FormGroup>
              <Label htmlFor="code">Mã code</Label>
              <Input name="code" value={formik.values.code} onChange={formik.handleChange} />
              <FormError>{formik.touched.code && formik.errors?.code}</FormError>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="value">Giá trị</Label>
              <Input
                name="value"
                type="number"
                value={formik.values.value}
                onChange={formik.handleChange}
              />
              <FormError>{formik.touched.value && formik.errors?.value}</FormError>
            </FormGroup>
          </div>
          <FormGroup>
            <Label htmlFor="code">Hạn sử dụng</Label>
            <Input
              name="expirationDate"
              type="datetime-local"
              value={formik.values.expirationDate}
              onChange={formik.handleChange}
            />
          </FormGroup>
          <div className="grid gap-2 lg:grid-cols-2">
            <FormGroup>
              <Label htmlFor="isPublic">Mã công khai</Label>
              <Switch
                name="isPublic"
                checked={formik.values.isPublic}
                handleOnChangeSwitch={(checked) => formik.setFieldValue("isPublic", checked)}
              />
              <FormError>{formik.touched.isPublic && formik.errors?.isPublic}</FormError>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="isFreeship">Mã freeship</Label>
              <Switch
                name="isFreeship"
                checked={formik.values.isFreeship}
                handleOnChangeSwitch={(checked) => formik.setFieldValue("isFreeship", checked)}
              />
              <FormError>{formik.touched.isFreeship && formik.errors?.isFreeship}</FormError>
            </FormGroup>
          </div>
          <Button type="submit" primary className="w-full h-10">
            Lưu
          </Button>
        </div>
        <div className="flex-1">
          <FormGroup>
            <Label htmlFor="voucher">Preview</Label>
            <VoucherItem
              title={formik.values.title}
              code={formik.values.code}
              isFreeship={formik.values.isFreeship}
              expirationDate={formik.values.expirationDate}
              className="max-w-[460px]"
            />
          </FormGroup>
        </div>
      </form>
    </Template>
  );
};

export default VoucherAddNew;
