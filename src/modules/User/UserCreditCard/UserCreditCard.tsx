import { IUserCreditCard } from "@types";
import { userAPI } from "apis";
import Button from "components/Button";
import FormError from "components/FormError";
import FormGroup from "components/FormGroup";
import Input from "components/Input";
import Label from "components/Label";
import { useFormik } from "formik";
import Template from "layouts/Template";
import { useEffect, useState } from "react";
import Cards from "react-credit-cards";
import { Helmet } from "react-helmet-async";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useStore } from "store/globalStore";
import { creditCardRules, setCurrentUserLocalStorage } from "utils";

enum InputFocus {
  name = "name",
  number = "number",
  expiry = "expiry",
  cvc = "cvc"
}
const UserCreditCard = () => {
  const { currentUser, setCurrentUser } = useStore((state) => state);
  const [focus, setFocus] = useState<InputFocus>(InputFocus.number);
  const handleInputFocus = (e: any) => setFocus(e.target.name);
  const updateCreditCardMutation = useMutation({
    mutationFn: (payload: IUserCreditCard) => userAPI.updateCreditCard(payload)
  });
  const formik = useFormik({
    initialValues: { number: "", name: "", expiry: "", cvc: "" },
    validationSchema: creditCardRules,
    onSubmit: async (values, { setErrors }) => {
      updateCreditCardMutation.mutate(values, {
        onSuccess: ({ message, data }) => {
          setCurrentUser({ ...currentUser, ...data });
          setCurrentUserLocalStorage({ ...currentUser, ...data });
          toast.success(message);
        },
        onError(error: any) {
          toast.success(error?.message);
          setErrors(error.error);
        }
      });
    }
  });
  const { values, touched, errors, handleSubmit, handleChange } = formik;
  useEffect(() => {
    if (!currentUser || !currentUser._id) return;
    formik.resetForm({ values: currentUser.creditCard });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);
  return (
    <Template title="Thẻ Tín Dụng/Ghi Nợ" desc="Thêm tài khoản ngân hàng">
      <Helmet>
        <title>Ngân hàng</title>
      </Helmet>
      <div className="flex flex-col-reverse gap-8 mt-6 lg:flex-row">
        <form className="w-full max-w-[500px]" onSubmit={handleSubmit} autoComplete="off">
          <FormGroup>
            <Label htmlFor="name">Họ và tên</Label>
            <Input
              name="name"
              value={values.name}
              onChange={handleChange}
              onFocus={handleInputFocus}
            />
            <FormError>{touched.name && errors?.name}</FormError>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="number">Số thẻ</Label>
            <Input
              name="number"
              value={values.number}
              onChange={handleChange}
              onFocus={handleInputFocus}
            />
            <FormError>{touched.number && errors?.number}</FormError>
          </FormGroup>
          <div className="grid lg:grid-cols-2 gap-x-3">
            <FormGroup>
              <Label htmlFor="expiry">Hết hạn</Label>
              <Input
                name="expiry"
                value={values.expiry}
                onChange={handleChange}
                onFocus={handleInputFocus}
              />
              <FormError>{touched.expiry && errors?.expiry}</FormError>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="cvc">CVG</Label>
              <Input
                name="cvc"
                value={values.cvc}
                onChange={handleChange}
                onFocus={handleInputFocus}
              />
              <FormError>{touched.cvc && errors?.cvc}</FormError>
            </FormGroup>
          </div>
          <Button type="submit" primary className="w-full h-10">
            Lưu
          </Button>
        </form>
        <div className="lg:mt-6">
          <Cards
            focused={focus}
            number={values.number}
            expiry={values.expiry}
            name={values.name}
            cvc={values.cvc}
          />
        </div>
      </div>
    </Template>
  );
};

export default UserCreditCard;
