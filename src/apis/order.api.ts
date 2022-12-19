import { IPayloadCancelOrder, IOrderParams, OrderResponse, OrdersResponse } from "@types";
import axiosClient from "./axiosClient";

export const orderAPI = {
  getAllOrder: (params: IOrderParams): Promise<OrdersResponse> => {
    const path = `api/order/me`;
    return axiosClient.get(path, { params });
  },
  getAllOrderByAdmin: (params: IOrderParams): Promise<OrdersResponse> => {
    const path = `api/order`;
    return axiosClient.get(path, { params });
  },
  getSingleOrder: (id: string): Promise<OrderResponse> => {
    const path = `api/order/${id}`;
    return axiosClient.get(path);
  },
  processingOrder: (id: string): Promise<OrderResponse> => {
    const path = `api/order/${id}/processing`;
    return axiosClient.put(path);
  },
  shippingOrder: (id: string): Promise<OrderResponse> => {
    const path = `api/order/${id}/shipping`;
    return axiosClient.put(path);
  },
  deliveredOrder: (id: string): Promise<OrderResponse> => {
    const path = `api/order/${id}/delivered`;
    return axiosClient.put(path);
  },
  cancelOrder: (id: string, payload: IPayloadCancelOrder): Promise<OrderResponse> => {
    const path = `api/order/${id}/canceled`;
    return axiosClient.put(path, payload);
  }
};
