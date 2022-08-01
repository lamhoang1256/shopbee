import { IResponse } from "interfaces";
import axiosClient from "./axiosClient";

export const configAPI = {
  getAllBanner: (): Promise<IResponse> => {
    const path = `api/banner`;
    return axiosClient.get(path);
  },
  getAllCategory: (): Promise<IResponse> => {
    const path = `api/category`;
    return axiosClient.get(path);
  },
  getAllProduct: (): Promise<IResponse> => {
    const path = `api/product/all`;
    return axiosClient.get(path);
  },
  getSingleProduct: (productId: string): Promise<IResponse> => {
    const path = `api/product/${productId}`;
    return axiosClient.get(path);
  },
  signIn: (user: any): Promise<IResponse> => {
    const path = `api/auth/sign-in`;
    return axiosClient.post(path, user);
  },
  signUp: (user: any): Promise<IResponse> => {
    const path = `api/auth/sign-up`;
    return axiosClient.post(path, user);
  },
  getAllCart: (userId: string): Promise<IResponse> => {
    const path = `api/cart?userId=${userId}`;
    return axiosClient.get(path);
  },
  addToCart: (values: any): Promise<IResponse> => {
    const path = `api/cart/add-to-cart`;
    return axiosClient.post(path, values);
  },
  deleteSingleCart: (values: any): Promise<IResponse> => {
    const path = `api/cart`;
    return axiosClient.delete(path, { data: values });
  },
  deleteAllCart: (values: any): Promise<IResponse> => {
    const path = `api/cart/all`;
    return axiosClient.delete(path, { data: values });
  },
  getAllOrder: (userId: string): Promise<IResponse> => {
    const path = `api/order/user?userId=${userId}`;
    return axiosClient.get(path);
  },
  getSingleOrder: (orderId: string): Promise<IResponse> => {
    const path = `api/order?orderId=${orderId}`;
    return axiosClient.get(path);
  },
  buyProducts: (values: any): Promise<IResponse> => {
    const path = `api/order`;
    return axiosClient.post(path, values);
  },
};
