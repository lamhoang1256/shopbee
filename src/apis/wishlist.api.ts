import { IProduct, IResponse, SuccessResponse } from "@types";
import axiosClient from "./axiosClient";

export type WishlistsResponse = SuccessResponse<IProduct[]>;
export const wishlistAPI = {
  getMyWishlist: (): Promise<WishlistsResponse> => {
    const path = `api/wishlist`;
    return axiosClient.get(path);
  },
  addToWishlist: (id: string): Promise<IResponse> => {
    const path = `api/wishlist?productId=${id}`;
    return axiosClient.post(path);
  },
  removeFromWishlist: (id: string): Promise<IResponse> => {
    const path = `api/wishlist?productId=${id}`;
    return axiosClient.delete(path);
  }
};
