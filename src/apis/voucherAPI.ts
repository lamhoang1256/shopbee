import { IResponse } from "@types";
import axiosClient from "./axiosClient";

export const voucherAPI = {
  getMyVoucher: (params?: any): Promise<IResponse> => {
    const path = `api/user/my-voucher`;
    return axiosClient.get(path, { params });
  },
  getAllVoucher: (params?: any): Promise<IResponse> => {
    const path = `api/voucher`;
    return axiosClient.get(path, { params });
  },
  saveVoucher: (code: string): Promise<IResponse> => {
    const path = `api/voucher/save?code=${code}`;
    return axiosClient.post(path);
  },
  addNewVoucher: (voucher: any): Promise<IResponse> => {
    const path = `api/voucher`;
    return axiosClient.post(path, voucher);
  },
};
