/* eslint-disable @typescript-eslint/no-unused-vars */
import { userAPI } from "apis";
import { Button } from "components/button";
import { FormGroup, Label, MessageError } from "components/form";
import { Input } from "components/input";
import { useFormik } from "formik";
import { Template } from "layouts";
import { useEffect, useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { useStore } from "store/globalStore";
import { setCurrentUserLocalStorage } from "utils/localStorage";
import * as Yup from "yup";

enum InputFocus {
  name = "name",
  number = "number",
  expiry = "expiry",
  cvc = "cvc"
}
const UserCreditCard = () => {
  const { currentUser, setCurrentUser } = useStore((state) => state);
  const [focus, setFocus] = useState<InputFocus>(InputFocus.number);
  const formik = useFormik({
    initialValues: {
      number: "",
      name: "",
      expiry: "",
      cvc: ""
    },
    validationSchema: Yup.object({
      number: Yup.string()
        .required("Vui lòng nhập số thẻ!")
        .min(16, "Số thẻ tối thiểu bao gồm 16 chữ số!")
        .max(19, "Số thẻ tối đa bao gồm 19 chữ số!"),
      name: Yup.string()
        .required("Vui lòng họ và tên!")
        .min(12, "Họ và tên tối thiểu bao gồm 12 kí tự!")
        .max(22, "Họ và tên tối đa bao gồm 22 kí tự!"),
      expiry: Yup.string()
        .required("Vui lòng thời hạn thẻ!")
        .min(5, "Thời hạn có định dạng MM/YY!")
        .max(5, "Thời hạn có định dạng MM/YY!"),
      cvc: Yup.string()
        .required("Vui lòng mã bảo vệ CVC!")
        .min(3, "Mã bảo vệ CVC tối thiểu bao gồm 3 kí tự!")
        .max(3, "Mã bảo vệ CVC tối đa bao gồm 3 kí tự!")
    }),
    onSubmit: async (values) => {
      try {
        const { data, message } = await userAPI.updateCreditCard(values);
        setCurrentUser({ ...currentUser, ...data });
        setCurrentUserLocalStorage({ ...currentUser, ...data });
        toast.success(message);
      } catch (error) {
        toast.error(error?.message);
      }
    }
  });
  const handleInputFocus = (e: any) => setFocus(e.target.name);
  useEffect(() => {
    if (currentUser?._id) formik.resetForm({ values: currentUser.creditCard });
  }, [currentUser]);

  return (
    <Template title="Thẻ Tín Dụng/Ghi Nợ" desc="Thêm tài khoản ngân hàng">
      <Helmet>
        <title>Ngân hàng</title>
      </Helmet>
      <div className="flex flex-col-reverse gap-8 mt-6 lg:flex-row">
        <form className="w-full max-w-[500px]" onSubmit={formik.handleSubmit} autoComplete="off">
          <FormGroup>
            <Label htmlFor="name">Họ và tên</Label>
            <Input
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onFocus={handleInputFocus}
            />
            <MessageError>{formik.touched.name && formik.errors?.name}</MessageError>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="number">Số thẻ</Label>
            <Input
              name="number"
              value={formik.values.number}
              onChange={formik.handleChange}
              onFocus={handleInputFocus}
            />
            <MessageError>{formik.touched.number && formik.errors?.number}</MessageError>
          </FormGroup>
          <div className="grid lg:grid-cols-2 gap-x-3">
            <FormGroup>
              <Label htmlFor="expiry">Hết hạn</Label>
              <Input
                name="expiry"
                value={formik.values.expiry}
                onChange={formik.handleChange}
                onFocus={handleInputFocus}
              />
              <MessageError>{formik.touched.expiry && formik.errors?.expiry}</MessageError>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="cvc">CVG</Label>
              <Input
                name="cvc"
                value={formik.values.cvc}
                onChange={formik.handleChange}
                onFocus={handleInputFocus}
              />
              <MessageError>{formik.touched.cvc && formik.errors?.cvc}</MessageError>
            </FormGroup>
          </div>
          <Button type="submit" primary className="w-full h-10">
            Lưu
          </Button>
        </form>
        <div className="lg:mt-6">
          <Cards
            focused={focus}
            number={formik.values.number}
            expiry={formik.values.expiry}
            name={formik.values.name}
            cvc={formik.values.cvc}
          />
        </div>
      </div>
    </Template>
  );
};

export default UserCreditCard;
