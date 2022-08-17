import { IResponse } from "@types";
import axiosClient from "./axiosClient";

export const userAPI = {
  getAllUser: (params: any): Promise<IResponse> => {
    const path = `api/user`;
    return axiosClient.get(path, { params });
  },
  getSingleUser: (userId: string): Promise<IResponse> => {
    const path = `api/user/${userId}`;
    return axiosClient.get(path);
  },
  addNewUser: (payload: any): Promise<IResponse> => {
    const path = `api/user`;
    return axiosClient.post(path, payload);
  },
  deleteUser: (userId: string): Promise<IResponse> => {
    const path = `api/user/${userId}`;
    return axiosClient.delete(path);
  },
  updateUser: (values: any): Promise<IResponse> => {
    const path = `api/user`;
    return axiosClient.put(path, values);
  },
  updateMe: (values: any): Promise<IResponse> => {
    const path = `api/user/me`;
    return axiosClient.put(path, values);
  },
  changePasswordMe: (values: any): Promise<IResponse> => {
    const path = `api/user/change-password`;
    return axiosClient.put(path, values);
  },
};
