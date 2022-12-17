import * as Yup from "yup";

export const signInRules = Yup.object({
  email: Yup.string()
    .required("Vui lòng nhập email!")
    .email("Email không đúng định dạng!")
    .min(5, "Độ dài từ 5 - 20 ký tự!")
    .max(20, "Độ dài từ 5 - 20 ký tự!"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu!")
    .min(6, "Độ dài từ 6 - 20 ký tự!")
    .max(20, "Độ dài từ 6 - 20 ký tự!")
});

export const signUpRules = Yup.object({
  email: Yup.string()
    .required("Vui lòng nhập email!")
    .email("Email không đúng định dạng!")
    .min(5, "Độ dài từ 5 - 20 ký tự!")
    .max(20, "Độ dài từ 5 - 20 ký tự!"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu!")
    .min(6, "Độ dài từ 6 - 20 ký tự!")
    .max(20, "Độ dài từ 6 - 20 ký tự!"),
  confirm_password: Yup.string()
    .required("Vui lòng nhập xác nhận mật khẩu!")
    .min(6, "Độ dài từ 6 - 20 ký tự!")
    .max(20, "Độ dài từ 6 - 20 ký tự!")
    .oneOf([Yup.ref("password")], "Xác nhận mật khẩu không khớp!")
});

export const addNewProductRules = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên sản phẩm!"),
  // image: Yup.string().required("Vui lòng chọn hình ảnh!"),
  description: Yup.string().required("Vui lòng nhập mô tả sản phẩm!"),
  category: Yup.string().required("Vui lòng chọn danh mục!"),
  oldPrice: Yup.number().required("Vui lòng chọn giá sản phẩm!"),
  price: Yup.number().required().max(Yup.ref("oldPrice"), "Giá đã giảm không được lớn hơn giá gốc"),
  stock: Yup.number().required("Vui lòng chọn số lượng!")
});

export const shopInfoRules = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên shop!"),
  street: Yup.string().required("Vui lòng nhập địa chỉ lấy hàng!"),
  city: Yup.object().shape({
    id: Yup.string().required("Vui lòng chọn Tỉnh/Thành phố!"),
    name: Yup.string().required("Vui lòng chọn Tỉnh/Thành phố!")
  }),
  district: Yup.object().shape({
    id: Yup.string().required("Vui lòng chọn Quận/Huyện!"),
    name: Yup.string().required("Vui lòng chọn Quận/Huyện!")
  }),
  ward: Yup.object().shape({
    id: Yup.string().required("Vui lòng chọn Phường/Xã!"),
    name: Yup.string().required("Vui lòng chọn Phường/Xã!")
  })
});
