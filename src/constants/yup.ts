import * as Yup from "yup";

export const SignUpYup = Yup.object({
  email: Yup.string().email("Email không hợp lệ!").required("Vui lòng nhập email của bạn!"),
  password: Yup.string().required("Vui lòng nhập mật khẩu!"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Xác nhận mật khẩu không khớp!")
    .required("Vui lòng nhập xác nhận mật khẩu!"),
});

export const SignInYup = Yup.object({
  email: Yup.string().email("Email không hợp lệ!").required("Vui lòng nhập email của bạn!"),
  password: Yup.string().required("Vui lòng nhập mật khẩu!"),
});

export const userSchema = Yup.object({
  fullname: Yup.string().required("Vui lòng nhập họ và tên!"),
  phone: Yup.string()
    .required("Vui lòng nhập số điện thoại!")
    .max(20, "Số điện thoại tối đa là 20 kí tự!"),
  street: Yup.string().required("Vui lòng nhập địa chỉ cụ thể!"),
  city: Yup.object().shape({
    id: Yup.string().required("Vui lòng chọn Tỉnh/Thành phố!"),
    name: Yup.string().required("Vui lòng chọn Tỉnh/Thành phố!"),
  }),
  district: Yup.object().shape({
    id: Yup.string().required("Vui lòng chọn Quận/Huyện!"),
    name: Yup.string().required("Vui lòng chọn Quận/Huyện!"),
  }),
  ward: Yup.object().shape({
    id: Yup.string().required("Vui lòng chọn Phường/Xã!"),
    name: Yup.string().required("Vui lòng chọn Phường/Xã!"),
  }),
});

export const shopSchema = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên shop!"),
  street: Yup.string().required("Vui lòng nhập địa chỉ lấy hàng!"),
  city: Yup.object().shape({
    id: Yup.string().required("Vui lòng chọn Tỉnh/Thành phố!"),
    name: Yup.string().required("Vui lòng chọn Tỉnh/Thành phố!"),
  }),
  district: Yup.object().shape({
    id: Yup.string().required("Vui lòng chọn Quận/Huyện!"),
    name: Yup.string().required("Vui lòng chọn Quận/Huyện!"),
  }),
  ward: Yup.object().shape({
    id: Yup.string().required("Vui lòng chọn Phường/Xã!"),
    name: Yup.string().required("Vui lòng chọn Phường/Xã!"),
  }),
});

export const UserPasswordSchemaYup = Yup.object({
  currentPassword: Yup.string().required("Vui lòng nhập mật khẩu!"),
  newPassword: Yup.string().required("Vui lòng nhập mật khẩu!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Xác nhận mật khẩu không khớp!")
    .required("Vui lòng nhập xác nhận mật khẩu!"),
});

export const SearchRangePriceYup = Yup.object({
  price_min: Yup.number().min(0),
  price_max: Yup.number().min(Yup.ref("price_min"), "Vui lòng điền khoảng giá phù hợp"),
});

export const ProductSchemaYup = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên sản phẩm!"),
  image: Yup.string().required("Vui lòng chọn hình ảnh!"),
  description: Yup.string().required("Vui lòng nhập mô tả sản phẩm!"),
  category: Yup.string().required("Vui lòng chọn danh mục!"),
  oldPrice: Yup.number().required("Vui lòng chọn giá sản phẩm!"),
  price: Yup.number().required().max(Yup.ref("oldPrice"), "Giá đã giảm không được lớn hơn giá gốc"),
  stock: Yup.number().required("Vui lòng chọn số lượng!"),
});

export const CategorySchema = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên danh mục!"),
  slug: Yup.string().required("Vui lòng chọn tên danh mục slug!"),
  image: Yup.string().required("Vui lòng chọn hình ảnh!"),
});
