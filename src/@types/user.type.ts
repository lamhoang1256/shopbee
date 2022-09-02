export interface IUserCreditCard {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
}
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
  creditCard: IUserCreditCard;
  __v: number;
}
export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export interface IUserSearchParams {
  page: number;
  limit: number;
  email: string;
}
export interface IPayloadChangePassword {
  currentPassword: string;
  newPassword: string;
}
export interface IPayloadAddNewUser {
  email: string;
  fullname: string;
  phone: string;
  password: string;
  avatar: string;
  street: string;
  city: { id: string; name: string };
  district: { id: string; name: string };
  ward: { id: string; name: string };
  address: string;
  isAdmin: boolean;
}
export type IPayloadUpdateUser = Omit<IPayloadAddNewUser, "password">;
export type IPayloadUpdateMe = Omit<IPayloadAddNewUser, "email" | "isAdmin">;
