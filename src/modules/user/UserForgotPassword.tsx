import { Button } from "components/button";
import { FormGroup, Label, MessageError } from "components/form";
import { Input } from "components/input";
import { useFormik } from "formik";
import * as Yup from "yup";

const UserForgotPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email không hợp lệ!").required("Vui lòng nhập email của bạn!"),
    }),
    onSubmit: (values) => {
      console.log("values: ", values);
    },
  });
  return (
    <div className='layout-container'>
      <div className='px-4 py-8 lg:p-10 mx-auto max-w-[500px] bg-white w-full rounded'>
        <h1 className='text-[22px]'>Đặt lại mật khẩu</h1>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup className='mt-4'>
            <Label htmlFor='email'>Email</Label>
            <Input
              placeholder='Email'
              name='email'
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <MessageError>{formik.touched.email && formik.errors?.email}</MessageError>
          </FormGroup>
          <Button primary className='w-full mt-3'>
            Xác Minh Email
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UserForgotPassword;
