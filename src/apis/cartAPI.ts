import { IPayloadAddToCart, IResponse } from "@types";
import axiosClient from "./axiosClient";

export const cartAPI = {
  getAllCart: (): Promise<IResponse> => {
    const path = `api/cart`;
    return axiosClient.get(path);
  },
  addToCart: (payload: IPayloadAddToCart): Promise<IResponse> => {
    const path = `api/cart/add-to-cart`;
    return axiosClient.post(path, payload);
  },
  deleteSingleCart: (cartId: string): Promise<IResponse> => {
    const path = `api/cart/${cartId}`;
    return axiosClient.delete(path);
  },
  deleteAllCart: (): Promise<IResponse> => {
    const path = `api/cart`;
    return axiosClient.delete(path);
  }
};
