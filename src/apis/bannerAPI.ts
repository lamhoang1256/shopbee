import { IPayloadAddNewBanner, IPayloadUpdateBanner, IResponse } from "@types";
import axiosClient from "./axiosClient";

export const bannerAPI = {
  getAllBanner: (): Promise<IResponse> => {
    const path = `api/banner`;
    return axiosClient.get(path);
  },
  addNewBanner: (payload: IPayloadAddNewBanner): Promise<IResponse> => {
    const path = `api/banner`;
    return axiosClient.post(path, payload);
  },
  updateBanner: (id: string, payload: IPayloadUpdateBanner): Promise<IResponse> => {
    const path = `api/banner/${id}`;
    return axiosClient.put(path, payload);
  },
  deleteBanner: (id: string): Promise<IResponse> => {
    const path = `api/banner/${id}`;
    return axiosClient.delete(path);
  },
};
