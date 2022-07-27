import * as Yup from "yup";

export const SignUpYup = Yup.object({
  email: Yup.string().email("Invalid email address").required("Please input your email!"),
  password: Yup.string().required("Please input your password!"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Password's not match")
    .required("Please input your confirm password!"),
});

export const SignInYup = Yup.object({
  email: Yup.string().email("Invalid email address").required("Please input your email!"),
  password: Yup.string().required("Please input your password!"),
});
