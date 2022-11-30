import {
  IDiscoverVoucherSearchParams,
  IPayloadAddNewVoucher,
  IPayloadUpdateVoucher,
  IResponse,
  IVoucherSearchParams
} from "@types";
import axiosClient from "./axiosClient";

export const voucherAPI = {
  getMyVoucher: (params?: Partial<IVoucherSearchParams>): Promise<IResponse> => {
    const path = `api/user/my-voucher`;
    return axiosClient.get(path, { params });
  },
  getDiscoverVoucher: (params?: Partial<IDiscoverVoucherSearchParams>): Promise<IResponse> => {
    const path = `api/voucher/discover`;
    return axiosClient.get(path, { params });
  },
  getAllVoucher: (params?: Partial<IVoucherSearchParams>): Promise<IResponse> => {
    const path = `api/voucher`;
    return axiosClient.get(path, { params });
  },
  getSingleVoucher: (id: string): Promise<IResponse> => {
    const path = `api/voucher/${id}`;
    return axiosClient.get(path);
  },
  saveVoucher: (code: string): Promise<IResponse> => {
    const path = `api/voucher/save?code=${code}`;
    return axiosClient.post(path);
  },
  addNewVoucher: (payload: IPayloadAddNewVoucher): Promise<IResponse> => {
    const path = `api/voucher`;
    return axiosClient.post(path, payload);
  },
  updateVoucher: (id: string, payload: IPayloadUpdateVoucher): Promise<IResponse> => {
    const path = `api/voucher/${id}`;
    return axiosClient.put(path, payload);
  },
  deleteVoucher: (id: string): Promise<IResponse> => {
    const path = `api/voucher/${id}`;
    return axiosClient.delete(path);
  }
};
