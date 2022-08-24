import { IResponse } from "@types";
import axiosClient from "./axiosClient";

export const categoryAPI = {
  getAllCategory: (): Promise<IResponse> => {
    const path = `api/category`;
    return axiosClient.get(path);
  },
  getSingleCategory: (categoryId: string): Promise<IResponse> => {
    const path = `api/category/${categoryId}`;
    return axiosClient.get(path);
  },
  deleteCategory: (categoryId: string): Promise<IResponse> => {
    const path = `api/category/${categoryId}`;
    return axiosClient.delete(path);
  },
  addNewCategory: (payload: any): Promise<IResponse> => {
    const path = `api/category`;
    return axiosClient.post(path, payload);
  },
  updateCategory: (categoryId: string, payload: any): Promise<IResponse> => {
    const path = `api/category/${categoryId}`;
    return axiosClient.put(path, payload);
  },
};
