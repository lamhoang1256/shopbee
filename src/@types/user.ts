export interface ICurrentUser {
  accessToken: string;
  addressHome: string;
  addressAdministrative: string;
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
