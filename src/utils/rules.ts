import * as Yup from "yup";

export const signInRules = Yup.object({
  email: Yup.string()
    .required("Vui lòng nhập email !")
    .email("Email không đúng định dạng !")
    .min(5, "Độ dài từ 5 - 20 ký tự !")
    .max(20, "Độ dài từ 5 - 20 ký tự !"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu !")
    .min(6, "Độ dài từ 6 - 20 ký tự !")
    .max(20, "Độ dài từ 6 - 20 ký tự !")
});

export const signUpRules = Yup.object({
  email: Yup.string()
    .required("Vui lòng nhập email !")
    .email("Email không đúng định dạng !")
    .min(5, "Độ dài từ 5 - 20 ký tự !")
    .max(20, "Độ dài từ 5 - 20 ký tự !"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu !")
    .min(6, "Độ dài từ 6 - 20 ký tự !")
    .max(20, "Độ dài từ 6 - 20 ký tự !"),
  confirm_password: Yup.string()
    .required("Vui lòng nhập xác nhận mật khẩu !")
    .min(6, "Độ dài từ 6 - 20 ký tự !")
    .max(20, "Độ dài từ 6 - 20 ký tự !")
    .oneOf([Yup.ref("password")], "Xác nhận mật khẩu không khớp !")
});
