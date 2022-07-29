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
    return axiosClient.post(path, user);
  },
  signUp: (user: any) => {
    const path = `api/auth/sign-up`;
    return axiosClient.post(path, user);
  },
  getPurchase: (userId: string) => {
    const path = `api/purchase?status=-1&userId=${userId}`;
    return axiosClient.get(path);
  },
  getAllPurchase: (userId: string, params: any) => {
    const path = `api/purchase?userId=${userId}`;
    return axiosClient.get(path, { params });
  },
  addToCart: (values: any) => {
    const path = `api/purchase/add-to-cart`;
    return axiosClient.post(path, values);
  },
  productPayment: (userId: string, values: any) => {
    const path = `api/purchase/payment?userId=${userId}`;
    return axiosClient.post(path, values);
  },
};
