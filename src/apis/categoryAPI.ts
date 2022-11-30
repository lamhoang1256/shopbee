import { IPayloadAddNewCategory, IPayloadUpdateCategory, IResponse } from "@types";
import axiosClient from "./axiosClient";

export const categoryAPI = {
  getAllCategory: (): Promise<IResponse> => {
    const path = `api/category`;
    return axiosClient.get(path);
  },
  getSingleCategory: (id: string): Promise<IResponse> => {
    const path = `api/category/${id}`;
    return axiosClient.get(path);
  },
  deleteCategory: (id: string): Promise<IResponse> => {
    const path = `api/category/${id}`;
    return axiosClient.delete(path);
  },
  addNewCategory: (payload: IPayloadAddNewCategory): Promise<IResponse> => {
    const path = `api/category`;
    return axiosClient.post(path, payload);
  },
  updateCategory: (id: string, payload: IPayloadUpdateCategory): Promise<IResponse> => {
    const path = `api/category/${id}`;
    return axiosClient.put(path, payload);
  }
};
