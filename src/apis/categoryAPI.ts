import { IResponse } from "interfaces";
import axiosClient from "./axiosClient";

export const categoryAPI = {
  getAllCategory: (): Promise<IResponse> => {
    const path = `api/category`;
    return axiosClient.get(path);
  },
};
