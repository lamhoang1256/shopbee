import { IResponse } from "@types";
import axiosClient from "./axiosClient";

export const shopAPI = {
  getShop: (): Promise<IResponse> => {
    const path = `api/shop`;
    return axiosClient.get(path);
  },
};
