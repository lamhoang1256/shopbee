import { IResponse } from "@types";

import axiosClient from "./axiosClient";

export const bannerAPI = {
  getAllBanner: (): Promise<IResponse> => {
    const path = `api/banner`;
    return axiosClient.get(path);
  },
  addNewBanner: (payload: { bannerUrl: string }): Promise<IResponse> => {
    const path = `api/banner`;
    return axiosClient.post(path, payload);
  },
  updateBanner: (bannerId: string, payload: { bannerUrl: string }): Promise<IResponse> => {
    const path = `api/banner/${bannerId}`;
    return axiosClient.put(path, payload);
  },
  deleteBanner: (bannerId: string): Promise<IResponse> => {
    const path = `api/banner/${bannerId}`;
    return axiosClient.delete(path);
  },
};
