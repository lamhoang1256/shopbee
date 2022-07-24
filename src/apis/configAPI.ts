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
};
