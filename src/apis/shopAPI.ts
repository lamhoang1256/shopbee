import { IResponse, IShop } from "@types";
import axiosClient from "./axiosClient";

export const shopAPI = {
  getShopInfo: (): Promise<IResponse> => {
    const path = `api/shop`;
    return axiosClient.get(path);
  },
  updateShopInfo: (payload: Partial<IShop>): Promise<IResponse> => {
    const path = `api/shop`;
    return axiosClient.put(path, payload);
  },
};
