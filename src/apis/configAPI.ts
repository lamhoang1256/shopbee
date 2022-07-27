import axiosClient from "./axiosClient";

export const configAPI = {
  getAllBanner: () => {
    const path = `api/banner`;
    return axiosClient(path);
  },
  getAllCategory: () => {
    const path = `api/category`;
    return axiosClient(path);
  },
  getAllProduct: () => {
    const path = `api/product/all`;
    return axiosClient(path);
  },
  getSingleProduct: (productId: string) => {
    const path = `api/product/${productId}`;
    return axiosClient(path);
  },
  signIn: (user: any) => {
    const path = `api/auth/sign-in`;
    return axiosClient.post<any>(path, user);
  },
};
