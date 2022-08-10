import { IProductPayload, IResponse, ISearchParams } from "@types";
import axiosClient from "./axiosClient";

export const productAPI = {
  addNewProduct: (product: IProductPayload): Promise<IResponse> => {
    const path = `api/product`;
    return axiosClient.post(path, product);
  },
  updateProduct: (productId: string, product: IProductPayload): Promise<IResponse> => {
    const path = `api/product/${productId}`;
    return axiosClient.put(path, product);
  },
  deleteProduct: (productId: string): Promise<IResponse> => {
    const path = `api/product/${productId}`;
    return axiosClient.delete(path);
  },
  getAllProduct: (params?: Partial<ISearchParams>): Promise<IResponse> => {
    const path = `api/product`;
    return axiosClient.get(path, { params });
  },
  getSingleProduct: (productId: string): Promise<IResponse> => {
    const path = `api/product/${productId}`;
    return axiosClient.get(path);
  },
  buyProducts: (values: any): Promise<IResponse> => {
    const path = `api/order`;
    return axiosClient.post(path, values);
  },
};
