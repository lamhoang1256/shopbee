import { voucherAPI } from "apis";
import { Button } from "components/button";
import { FormGroup, Label, MessageError } from "components/form";
import { Input } from "components/input";
import { useFormik } from "formik";
import { Template } from "layouts";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { formatDatetimeLocal } from "utils/helper";
import VoucherItem from "./VoucherItem";

const VoucherUpdate = () => {
  const { id = "" } = useParams();
  const formik = useFormik({
    initialValues: {
      code: "",
      title: "",
      expirationDate: 0,
      value: 0,
    },
    onSubmit: async (values) => {
      try {
        const expirationDate = new Date(values.expirationDate).getTime();
        const { message } = await voucherAPI.updateVoucher(id, { ...values, expirationDate });
        toast.success(message);
      } catch (err: any) {
        toast.error(err?.message);
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await voucherAPI.getSingleVoucher(id);
        const expirationDate = formatDatetimeLocal(new Date(data.expirationDate));
        formik.resetForm({ values: { ...data, expirationDate } });
      } catch (err: any) {
        toast.error(err?.message);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Template title='Chỉnh sửa thông tin voucher' desc='Vui lòng nhập đầy đủ thông tin voucher'>
      <form
        autoComplete='off'
        onSubmit={formik.handleSubmit}
        className='flex flex-col-reverse gap-8 mt-6 lg:flex-row'
      >
        <div className='max-w-[600px]'>
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
            Cập nhật
          </Button>
        </div>
        <div className='flex-1'>
          <FormGroup>
            <Label htmlFor='voucher'>Preview</Label>
            <VoucherItem
              title={formik.values.title}
              expirationDate={formik.values.expirationDate}
              className='max-w-[460px]'
            />
          </FormGroup>
        </div>
      </form>
    </Template>
  );
};

export default VoucherUpdate;
