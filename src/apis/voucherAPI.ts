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
  getSingleVoucher: (voucherId: string): Promise<IResponse> => {
    const path = `api/voucher/${voucherId}`;
    return axiosClient.get(path);
  },
  saveVoucher: (code: string): Promise<IResponse> => {
    const path = `api/voucher/save?code=${code}`;
    return axiosClient.post(path);
  },
  updateVoucher: (voucherId: string, payload: any): Promise<IResponse> => {
    const path = `api/voucher/${voucherId}`;
    return axiosClient.put(path, payload);
  },
  deleteVoucher: (voucherId: string): Promise<IResponse> => {
    const path = `api/voucher/${voucherId}`;
    return axiosClient.delete(path);
  },
  addNewVoucher: (voucher: any): Promise<IResponse> => {
    const path = `api/voucher`;
    return axiosClient.post(path, voucher);
  },
};
