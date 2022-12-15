import { IResponse, IShopInfo, ShopInfoResponse, ShopOverviewResponse } from "@types";
import axiosClient from "./axiosClient";

export const shopAPI = {
  getShopInfo: (): Promise<ShopInfoResponse> => {
    const path = `api/shop`;
    return axiosClient.get(path);
  },
  getShopOverview: (): Promise<ShopOverviewResponse> => {
    const path = `api/shop/overview`;
    return axiosClient.get(path);
  },
  updateShopInfo: (payload: Partial<IShopInfo>): Promise<IResponse> => {
    const path = `api/shop`;
    return axiosClient.put(path, payload);
  }
};
