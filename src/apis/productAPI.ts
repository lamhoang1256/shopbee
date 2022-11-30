import {
  IPayloadAddNewProduct,
  IPayloadUpdateProduct,
  IResponse,
  IProductSearchParams,
  IPayloadBuyProduct
} from "@types";
import axiosClient from "./axiosClient";

export const productAPI = {
  addNewProduct: (payload: IPayloadAddNewProduct): Promise<IResponse> => {
    const path = `api/product`;
    return axiosClient.post(path, payload);
  },
  updateProduct: (id: string, payload: IPayloadUpdateProduct): Promise<IResponse> => {
    const path = `api/product/${id}`;
    return axiosClient.put(path, payload);
  },
  deleteProduct: (id: string): Promise<IResponse> => {
    const path = `api/product/${id}`;
    return axiosClient.delete(path);
  },
  getAllProduct: (params?: Partial<IProductSearchParams>): Promise<IResponse> => {
    const path = `api/product`;
    return axiosClient.get(path, { params });
  },
  getSingleProduct: (id: string): Promise<IResponse> => {
    const path = `api/product/${id}`;
    return axiosClient.get(path);
  },
  buyProducts: (payload: IPayloadBuyProduct): Promise<IResponse> => {
    const path = `api/order`;
    return axiosClient.post(path, payload);
  }
};
