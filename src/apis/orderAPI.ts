import { IResponse } from "@types";
import axiosClient from "./axiosClient";

export const orderAPI = {
  getAllOrder: (params: any): Promise<IResponse> => {
    const path = `api/order/me`;
    return axiosClient.get(path, { params });
  },
  getAllOrderByAdmin: (params: any): Promise<IResponse> => {
    const path = `api/order/admin`;
    return axiosClient.get(path, { params });
  },
  getSingleOrder: (orderId: string): Promise<IResponse> => {
    const path = `api/order?orderId=${orderId}`;
    return axiosClient.get(path);
  },
};
