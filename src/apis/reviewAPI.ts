import { IResponse } from "@types";
import axiosClient from "./axiosClient";

export const reviewAPI = {
  getAllReviewProduct: (productId: string): Promise<IResponse> => {
    const path = `api/review/product/${productId}`;
    return axiosClient.get(path);
  },
  getAllReviewOrder: (orderId: string): Promise<IResponse> => {
    const path = `api/review/order/${orderId}`;
    return axiosClient.get(path);
  },
  addNewReview: (review: any): Promise<IResponse> => {
    const path = `api/review`;
    return axiosClient.post(path, review);
  },
  updateReview: (id: string, review: any): Promise<IResponse> => {
    const path = `api/review/${id}`;
    return axiosClient.put(path, review);
  },
  deleteReview: (id: string): Promise<IResponse> => {
    const path = `api/review/${id}`;
    return axiosClient.delete(path);
  },
};
