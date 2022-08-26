import { IResponse } from "@types";
import axiosClient from "./axiosClient";

export const orderAPI = {
  getAllOrder: (params: any): Promise<IResponse> => {
    const path = `api/order/me`;
    return axiosClient.get(path, { params });
  },
  getAllOrderByAdmin: (params: any): Promise<IResponse> => {
    const path = `api/order`;
    return axiosClient.get(path, { params });
  },
  getSingleOrder: (orderId: string): Promise<IResponse> => {
    const path = `api/order/${orderId}`;
    return axiosClient.get(path);
  },
  cancelOrder: (orderId: string, payload?: { reasonCancel: string }): Promise<IResponse> => {
    const path = `api/order/${orderId}/canceled`;
    return axiosClient.put(path, payload);
  },
};
