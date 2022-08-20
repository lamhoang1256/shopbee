import { IResponse } from "@types";
import axiosClient from "./axiosClient";

export const voucherAPI = {
  getMyVoucher: (): Promise<IResponse> => {
    const path = `api/user/my-voucher`;
    return axiosClient.get(path);
  },
  saveVoucher: (code: string): Promise<IResponse> => {
    const path = `api/voucher/save?code=${code}`;
    return axiosClient.post(path);
  },
};
