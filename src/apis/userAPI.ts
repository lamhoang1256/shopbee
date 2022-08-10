import { IResponse } from "interfaces";
import axiosClient from "./axiosClient";

export const userAPI = {
  getAllUser: (): Promise<IResponse> => {
    const path = `api/user/?limit=1`;
    return axiosClient.get(path);
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
  updateProfileMe: (values: any): Promise<IResponse> => {
    const path = `api/user`;
    return axiosClient.put(path, values);
  },
  changePasswordMe: (values: any): Promise<IResponse> => {
    const path = `api/user/change-password`;
    return axiosClient.put(path, values);
  },
};
