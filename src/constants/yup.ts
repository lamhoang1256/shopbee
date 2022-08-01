import * as Yup from "yup";

export const SignUpYup = Yup.object({
  email: Yup.string().email("Email không hợp lệ!").required("Vui lòng nhập email của bạn!"),
  password: Yup.string().required("Vui lòng nhập mật khẩu!"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Password's not match")
    .required("Please input your confirm password!"),
});

export const SignInYup = Yup.object({
  email: Yup.string().email("Email không hợp lệ!").required("Vui lòng nhập email của bạn!"),
  password: Yup.string().required("Vui lòng nhập mật khẩu!"),
});

export const UserProfileYup = Yup.object({
  fullname: Yup.string().required("Vui lòng nhập họ và tên!"),
  phone: Yup.string()
    .required("Vui lòng nhập số điện thoại!")
    .max(20, "Số điện thoại tối đa là 20 kí tự!"),
  addressAdministrative: Yup.string().required(
    "Vui lòng chọn Tỉnh/ Thành phố, Quận/Huyện, Phường/Xã!",
  ),
  addressHome: Yup.string().required("Vui lòng nhập địa chỉ giao hàng!"),
});
