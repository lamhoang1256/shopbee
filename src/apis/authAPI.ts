import { IRefreshToken, IResponse } from "@types";
import axiosClient from "./axiosClient";

export const authAPI = {
  signIn: (user: any): Promise<IResponse> => {
    const path = `api/auth/sign-in`;
    return axiosClient.post(path, user);
  },
  signUp: (user: any): Promise<IResponse> => {
    const path = `api/auth/sign-up`;
    return axiosClient.post(path, user);
  },
  logout: (refreshToken: IRefreshToken): Promise<IResponse> => {
    const path = `api/auth/logout?refreshToken=${refreshToken}`;
    return axiosClient.post(path);
  },
};
