export interface ICurrentUser {
  _id: string;
  accessToken: string;
  refreshToken: string;
  street: string;
  address: string;
  cityId: string;
  districtId: string;
  wardId: string;
  fullname: string;
  email: string;
  avatar: string;
  phone: string;
  isAdmin: boolean;
  password?: string;
  createdAt: string;
  updatedAt: string;
  vouchersSave: [];
  wishlist: string[];
  __v: number;
}

export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
