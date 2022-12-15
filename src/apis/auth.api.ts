import { AuthResponse, IPayloadAuth, IResponse } from "@types";
import axiosClient from "./axiosClient";

export const authAPI = {
  signIn: (payload: IPayloadAuth): Promise<AuthResponse> => {
    const path = `api/auth/sign-in`;
    return axiosClient.post(path, payload);
  },
  signUp: (payload: IPayloadAuth): Promise<AuthResponse> => {
    const path = `api/auth/sign-up`;
    return axiosClient.post(path, payload);
  },
  logout: (refreshToken: string): Promise<IResponse> => {
    const path = `api/auth/logout?refreshToken=${refreshToken}`;
    return axiosClient.post(path);
  }
};
