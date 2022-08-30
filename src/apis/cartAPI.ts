import { IResponse } from "@types";
import axiosClient from "./axiosClient";

export const cartAPI = {
  getAllCart: (): Promise<IResponse> => {
    const path = `api/cart`;
    return axiosClient.get(path);
  },
  addToCart: (values: any): Promise<IResponse> => {
    const path = `api/cart/add-to-cart`;
    return axiosClient.post(path, values);
  },
  deleteSingleCart: (cardId: any): Promise<IResponse> => {
    const path = `api/cart/${cardId}`;
    return axiosClient.delete(path);
  },
  deleteAllCart: (): Promise<IResponse> => {
    const path = `api/cart`;
    return axiosClient.delete(path);
  },
};
