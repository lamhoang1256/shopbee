import { IResponse } from "@types";
import axiosClient from "./axiosClient";

export const wishlistAPI = {
  getMyWishlist: (): Promise<IResponse> => {
    const path = `api/wishlist`;
    return axiosClient.get(path);
  },
  addToWishlist: (payload: { productId: string }): Promise<IResponse> => {
    const path = `api/wishlist`;
    return axiosClient.post(path, payload);
  },
  removeFromWishlist: (payload: { productId: string }): Promise<IResponse> => {
    const path = `api/wishlist`;
    return axiosClient.put(path, payload);
  },
};
