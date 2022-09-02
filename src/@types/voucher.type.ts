export interface IVoucherSearchParams {
  code: string;
  status: string;
  limit: number;
  page: number;
}
export interface IVoucher {
  code: string;
  createdAt: string;
  title: string;
  expirationDate: number;
  updatedAt: string;
  usersUsed: string[];
  usersSave: string[];
  value: number;
  _id: string;
}
export interface IPayloadAddNewVoucher {
  code: string;
  title: string;
  expirationDate: number;
  value: number;
}
export interface IPayloadUpdateVoucher extends IPayloadAddNewVoucher {}
