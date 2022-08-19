import { IPayloadReview, IProduct, IResponse, ISearchParams } from "@types";
import axiosClient from "./axiosClient";

export const productAPI = {
  addNewProduct: (product: Partial<IProduct>): Promise<IResponse> => {
    const path = `api/product`;
    return axiosClient.post(path, product);
  },
  addNewReview: (productId: string, review: IPayloadReview): Promise<IResponse> => {
    const path = `api/product/${productId}/review`;
    return axiosClient.post(path, review);
  },
  updateReview: (productId: string, review: IPayloadReview): Promise<IResponse> => {
    const path = `api/product/${productId}/review`;
    return axiosClient.put(path, review);
  },
  deleteReview: (productId: string, payload: { reviewId: string }): Promise<IResponse> => {
    const path = `api/product/${productId}/review`;
    return axiosClient.delete(path, { data: payload });
  },
  updateProduct: (productId: string, product: Partial<IProduct>): Promise<IResponse> => {
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
