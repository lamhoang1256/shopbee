import * as Yup from "yup";

export const signInRules = Yup.object({
  email: Yup.string()
    .required("Vui lòng nhập email!")
    .email("Email không đúng định dạng!")
    .min(5, "Độ dài từ 5 - 160 ký tự!")
    .max(160, "Độ dài từ 5 - 160 ký tự!"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu!")
    .min(6, "Độ dài từ 6 - 160 ký tự!")
    .max(160, "Độ dài từ 6 - 160 ký tự!")
});

export const signUpRules = Yup.object({
  email: Yup.string()
    .required("Vui lòng nhập email!")
    .email("Email không đúng định dạng!")
    .min(5, "Độ dài từ 5 - 160 ký tự!")
    .max(160, "Độ dài từ 5 - 160 ký tự!"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu!")
    .min(6, "Độ dài từ 6 - 160 ký tự!")
    .max(160, "Độ dài từ 6 - 160 ký tự!"),
  confirm_password: Yup.string()
    .required("Vui lòng nhập xác nhận mật khẩu!")
    .min(6, "Độ dài từ 6 - 160 ký tự!")
    .max(160, "Độ dài từ 6 - 160 ký tự!")
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

export const userRules = Yup.object({
  email: Yup.string().email("Email không hợp lệ!").required("Vui lòng nhập email của bạn!"),
  fullname: Yup.string().required("Vui lòng nhập họ và tên!"),
  phone: Yup.string()
    .required("Vui lòng nhập số điện thoại!")
    .max(160, "Số điện thoại tối đa là 160 kí tự!"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu!")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Xác nhận mật khẩu không khớp!")
    .required("Vui lòng nhập xác nhận mật khẩu!"),
  street: Yup.string().required("Vui lòng nhập địa chỉ cụ thể!"),
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

export const userUpdateRules = userRules.pick([
  "fullname",
  "phone",
  "street",
  "city",
  "district",
  "ward"
]);

export const updatePasswordRules = Yup.object({
  currentPassword: Yup.string()
    .required("Vui lòng nhập mật khẩu!")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  newPassword: Yup.string()
    .required("Vui lòng nhập mật khẩu!")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Xác nhận mật khẩu không khớp!")
    .required("Vui lòng nhập xác nhận mật khẩu!")
});

export const categoryRules = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên danh mục!"),
  slug: Yup.string().required("Vui lòng chọn tên danh mục slug!"),
  image: Yup.string().required("Vui lòng chọn hình ảnh!")
});

export const priceRules = Yup.object({
  price_min: Yup.number().min(0).default(0),
  price_max: Yup.number().min(Yup.ref("price_min"), "Vui lòng điền khoảng giá phù hợp")
});

export const creditCardRules = Yup.object({
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
});

export const voucherRules = Yup.object({
  code: Yup.string()
    .required("Vui lòng nhập mã code!")
    .min(5, "Họ và tên tối thiểu bao gồm 5 kí tự!")
    .max(20, "Họ và tên tối đa bao gồm 20 kí tự!"),
  title: Yup.string()
    .required("Vui lòng tên voucher!")
    .min(10, "Họ và tên tối thiểu bao gồm 10 kí tự!")
    .max(200, "Họ và tên tối đa bao gồm 200 kí tự!"),
  value: Yup.number().min(0).default(0),
  expirationDate: Yup.number().default(Number(new Date())),
  isPublic: Yup.boolean(),
  isFreeship: Yup.boolean()
});
