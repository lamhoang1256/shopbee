import { IPayloadSignIn, IPayloadSignUp, IResponse } from "@types";
import axiosClient from "./axiosClient";

export const authAPI = {
  signIn: (payload: IPayloadSignIn): Promise<IResponse> => {
    const path = `api/auth/sign-in`;
    return axiosClient.post(path, payload);
  },
  signUp: (payload: IPayloadSignUp): Promise<IResponse> => {
    const path = `api/auth/sign-up`;
    return axiosClient.post(path, payload);
  },
  logout: (refreshToken: string): Promise<IResponse> => {
    const path = `api/auth/logout?refreshToken=${refreshToken}`;
    return axiosClient.post(path);
  }
};
