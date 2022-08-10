import { IResponse } from "interfaces";
import axiosClient from "./axiosClient";

export const cartAPI = {
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
};
