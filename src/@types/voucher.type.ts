import { IPagination, SuccessResponse } from "./utils.type";

export interface IDiscoverVoucherSearchParams {
  limit: number;
  page: number;
}

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
  isFreeship: boolean;
  isPublic: boolean;
  expirationDate: number;
  updatedAt: string;
  usersUsed: string[];
  usersSave: string[];
  value: number;
  _id: string;
}

export interface IPayloadVoucher {
  code: string;
  title: string;
  expirationDate: number;
  value: number;
}

export type VoucherResponse = SuccessResponse<IVoucher>;
export type MyVouchersResponse = SuccessResponse<IVoucher[]>;
export type VouchersResponse = SuccessResponse<{
  vouchers: IVoucher[];
  pagination: IPagination;
}>;
