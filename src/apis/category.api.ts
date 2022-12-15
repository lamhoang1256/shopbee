import { CategoriesResponse, CategoryResponse, IPayloadCategory, IResponse } from "@types";
import axiosClient from "./axiosClient";

export const categoryAPI = {
  getAllCategory: (): Promise<CategoriesResponse> => {
    const path = `api/category`;
    return axiosClient.get(path);
  },
  getSingleCategory: (id: string): Promise<CategoryResponse> => {
    const path = `api/category/${id}`;
    return axiosClient.get(path);
  },
  deleteCategory: (id: string): Promise<IResponse> => {
    const path = `api/category/${id}`;
    return axiosClient.delete(path);
  },
  addNewCategory: (payload: IPayloadCategory): Promise<IResponse> => {
    const path = `api/category`;
    return axiosClient.post(path, payload);
  },
  updateCategory: (id: string, payload: IPayloadCategory): Promise<IResponse> => {
    const path = `api/category/${id}`;
    return axiosClient.put(path, payload);
  }
};
