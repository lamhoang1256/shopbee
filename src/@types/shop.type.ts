import { SuccessResponse } from "./utils.type";

export interface IShopInfo {
  _id: string;
  name: string;
  avatar: string;
  city: { id: string; name: string };
  district: { id: string; name: string };
  ward: { id: string; name: string };
  street: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface IShopOverview {
  totalOrders: number;
  totalOrdersWaiting: number;
  totalOrdersProcessing: number;
  totalOrdersShipping: number;
  totalOrdersCanceled: number;
  totalOrdersDelivered: number;
  totalProducts: number;
  totalUsers: number;
  totalVouchers: number;
  totalRevenue: number;
}

export type ShopOverviewResponse = SuccessResponse<IShopOverview>;
export type ShopInfoResponse = SuccessResponse<IShopInfo>;
