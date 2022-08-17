import { IResponse, IShop } from "@types";
import axiosClient from "./axiosClient";

export const shopAPI = {
  getShop: (): Promise<IResponse> => {
    const path = `api/shop`;
    return axiosClient.get(path);
  },
  updateShop: (id: string, payload: Partial<IShop>): Promise<IResponse> => {
    const path = `api/shop/${id}`;
    return axiosClient.put(path, payload);
  },
};
