export interface ICurrentUser {
  _id: string;
  accessToken: string;
  refreshToken: string;
  street: string;
  address: string;
  city: { id: string; name: string };
  district: { id: string; name: string };
  ward: { id: string; name: string };
  fullname: string;
  email: string;
  avatar: string;
  phone: string;
  isAdmin: boolean;
  password?: string;
  createdAt: string;
  updatedAt: string;
  creditCard: {
    number: string;
    name: string;
    expiry: string;
    cvc: string;
  };
  __v: number;
}

export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
