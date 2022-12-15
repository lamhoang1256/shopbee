import {
  IPayloadBuyProduct,
  IPayloadProduct,
  IProductSearchParams,
  IResponse,
  ProductResponse,
  ProductsResponse
} from "@types";
import axiosClient from "./axiosClient";

export const productAPI = {
  addNewProduct: (payload: IPayloadProduct): Promise<ProductResponse> => {
    const path = `api/product`;
    return axiosClient.post(path, payload);
  },
  updateProduct: (id: string, payload: IPayloadProduct): Promise<ProductResponse> => {
    const path = `api/product/${id}`;
    return axiosClient.put(path, payload);
  },
  deleteProduct: (id: string): Promise<ProductResponse> => {
    const path = `api/product/${id}`;
    return axiosClient.delete(path);
  },
  getAllProduct: (params?: Partial<IProductSearchParams>): Promise<ProductsResponse> => {
    const path = `api/product`;
    return axiosClient.get(path, { params });
  },
  getSingleProduct: (id: string): Promise<ProductResponse> => {
    const path = `api/product/${id}`;
    return axiosClient.get(path);
  },
  buyProducts: (payload: IPayloadBuyProduct): Promise<IResponse> => {
    const path = `api/order`;
    return axiosClient.post(path, payload);
  }
};
