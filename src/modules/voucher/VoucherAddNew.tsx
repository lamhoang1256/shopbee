import { voucherAPI } from "apis";
import { Button } from "components/button";
import { FormGroup, Label, MessageError } from "components/form";
import { Input } from "components/input";
import { useFormik } from "formik";
import { HeaderTemplate } from "layouts";
import { toast } from "react-toastify";
// import { formatDatetimeLocal } from "utils/helper";

const VoucherAddNew = () => {
  const formik = useFormik({
    initialValues: {
      code: "",
      title: "",
      expirationDate: "",
      value: 0,
    },
    onSubmit: async (values) => {
      const payload = {
        ...values,
        expirationDate: new Date(values.expirationDate).getTime(),
      };
      try {
        const { success, message } = await voucherAPI.addNewVoucher(payload);
        if (success) toast.success(message);
      } catch (error: any) {
        toast.error(error?.message);
      }
    },
  });

  return (
    <HeaderTemplate
      label='Thêm mới voucher'
      desc='Vui lòng nhập đầy đủ thông tin cho sản phẩm của bạn'
    >
      <div className='flex flex-col-reverse gap-8 mt-6 lg:flex-row'>
        <form className='max-w-[600px]' onSubmit={formik.handleSubmit} autoComplete='off'>
          <FormGroup>
            <Label htmlFor='title'>Tên mã giảm giá</Label>
            <Input name='title' value={formik.values.title} onChange={formik.handleChange} />
            <MessageError>{formik.touched.title && formik.errors?.title}</MessageError>
          </FormGroup>
          <div className='grid gap-2 lg:grid-cols-2'>
            <FormGroup>
              <Label htmlFor='code'>Mã code</Label>
              <Input name='code' value={formik.values.code} onChange={formik.handleChange} />
              <MessageError>{formik.touched.code && formik.errors?.code}</MessageError>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='value'>Giá trị</Label>
              <Input
                name='value'
                type='number'
                value={formik.values.value}
                onChange={formik.handleChange}
              />
              <MessageError>{formik.touched.value && formik.errors?.value}</MessageError>
            </FormGroup>
          </div>
          <FormGroup>
            <Label htmlFor='code'>Hạn sử dụng</Label>
            <Input
              name='expirationDate'
              type='datetime-local'
              value={formik.values.expirationDate}
              onChange={formik.handleChange}
            />
          </FormGroup>

          <Button type='submit' primary className='w-full h-10'>
            Lưu
          </Button>
        </form>
      </div>
    </HeaderTemplate>
  );
};

export default VoucherAddNew;
