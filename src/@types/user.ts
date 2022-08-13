export interface ICurrentUser {
  accessToken: string;
  street: string;
  address: string;
  addressHome: string;
  wardId: string;
  districtId: string;
  cityId: string;
  createdAt: string;
  email: string;
  avatar: string;
  fullname: string;
  isAdmin: boolean;
  phone: string;
  password?: string;
  refreshToken: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface IPayloadChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
