import { IResponse } from "@types";
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
};
