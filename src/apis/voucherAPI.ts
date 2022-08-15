import { IResponse } from "@types";
import axiosClient from "./axiosClient";

export const voucherAPI = {
  applyVoucher: (code: string): Promise<IResponse> => {
    const path = `api/voucher/apply?code=${code}`;
    return axiosClient.get(path);
  },
};
