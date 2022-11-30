import { IOrderParams, IPayloadCancelOrder, IResponse } from "@types";
import axiosClient from "./axiosClient";

export const orderAPI = {
  getAllOrder: (params: IOrderParams): Promise<IResponse> => {
    const path = `api/order/me`;
    return axiosClient.get(path, { params });
  },
  getAllOrderByAdmin: (params: IOrderParams): Promise<IResponse> => {
    const path = `api/order`;
    return axiosClient.get(path, { params });
  },
  getSingleOrder: (id: string): Promise<IResponse> => {
    const path = `api/order/${id}`;
    return axiosClient.get(path);
  },
  processingOrder: (id: string): Promise<IResponse> => {
    const path = `api/order/${id}/processing`;
    return axiosClient.put(path);
  },
  shippingOrder: (id: string): Promise<IResponse> => {
    const path = `api/order/${id}/shipping`;
    return axiosClient.put(path);
  },
  deliveredOrder: (id: string): Promise<IResponse> => {
    const path = `api/order/${id}/delivered`;
    return axiosClient.put(path);
  },
  cancelOrder: (id: string, payload: IPayloadCancelOrder): Promise<IResponse> => {
    const path = `api/order/${id}/canceled`;
    return axiosClient.put(path, payload);
  }
};
