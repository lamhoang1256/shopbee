export const initialValuesProduct = {
  name: "",
  image: "",
  images: [""],
  description: "",
  category: "",
  oldPrice: 0,
  price: 0,
  rating: 0,
  stock: 0,
  sold: 0,
  view: Math.floor(Math.random() * (10000 - 0 + 1)) + 0
};

export const initialValuesShopInfo = {
  name: "",
  avatar: "",
  street: "",
  address: "",
  city: { id: "", name: "" },
  district: { id: "", name: "" },
  ward: { id: "", name: "" }
};

export const initialValuesUser = {
  email: "",
  fullname: "",
  phone: "",
  password: "",
  confirm_password: "",
  avatar: "",
  street: "",
  city: { id: "", name: "" },
  district: { id: "", name: "" },
  ward: { id: "", name: "" },
  address: "",
  isAdmin: false
};

export const initialValuesUpdateUser = {
  fullname: "",
  phone: "",
  email: "",
  avatar: "",
  street: "",
  city: { id: "", name: "" },
  district: { id: "", name: "" },
  ward: { id: "", name: "" },
  address: "",
  isAdmin: false
};

export const initialValuesPasswords = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: ""
};

export const initialValuesVoucher = {
  code: "",
  title: "",
  expirationDate: Date.now(),
  value: 0,
  isPublic: true,
  isFreeship: false
};
