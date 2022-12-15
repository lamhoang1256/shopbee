import {
  IPayloadAddNewUser,
  IPayloadChangePassword,
  IPayloadUpdateMe,
  IPayloadUpdateUser,
  IResponse,
  IUserCreditCard,
  IUserSearchParams,
  UserResponse,
  UsersResponse
} from "@types";
import axiosClient from "./axiosClient";

export const userAPI = {
  getAllUser: (params: Partial<IUserSearchParams>): Promise<UsersResponse> => {
    const path = `api/user`;
    return axiosClient.get(path, { params });
  },
  getSingleUser: (id: string): Promise<UserResponse> => {
    const path = `api/user/${id}`;
    return axiosClient.get(path);
  },
  addNewUser: (payload: IPayloadAddNewUser): Promise<UserResponse> => {
    const path = `api/user`;
    return axiosClient.post(path, payload);
  },
  deleteUser: (id: string): Promise<IResponse> => {
    const path = `api/user/${id}`;
    return axiosClient.delete(path);
  },
  updateUser: (id: string, payload: IPayloadUpdateUser): Promise<UserResponse> => {
    const path = `api/user/${id}`;
    return axiosClient.put(path, payload);
  },
  updateCreditCard: (payload: IUserCreditCard): Promise<UserResponse> => {
    const path = `api/user/credit-card`;
    return axiosClient.put(path, payload);
  },
  updateMe: (payload: Partial<IPayloadUpdateMe>): Promise<UserResponse> => {
    const path = `api/user/me`;
    return axiosClient.put(path, payload);
  },
  changePasswordMe: (payload: IPayloadChangePassword): Promise<IResponse> => {
    const path = `api/user/change-password`;
    return axiosClient.put(path, payload);
  }
};
