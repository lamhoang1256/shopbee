import {
  IDiscoverVoucherSearchParams,
  IPayloadVoucher,
  IResponse,
  IVoucherSearchParams,
  MyVouchersResponse,
  VoucherResponse,
  VouchersResponse
} from "@types";
import axiosClient from "./axiosClient";

export const voucherAPI = {
  getMyVoucher: (params?: Partial<IVoucherSearchParams>): Promise<MyVouchersResponse> => {
    const path = `api/user/my-voucher`;
    return axiosClient.get(path, { params });
  },
  getDiscoverVoucher: (
    params?: Partial<IDiscoverVoucherSearchParams>
  ): Promise<VouchersResponse> => {
    const path = `api/voucher/discover`;
    return axiosClient.get(path, { params });
  },
  getAllVoucher: (params?: Partial<IVoucherSearchParams>): Promise<VouchersResponse> => {
    const path = `api/voucher`;
    return axiosClient.get(path, { params });
  },
  getSingleVoucher: (id: string): Promise<VoucherResponse> => {
    const path = `api/voucher/${id}`;
    return axiosClient.get(path);
  },
  saveVoucher: (code: string): Promise<VoucherResponse> => {
    const path = `api/voucher/save?code=${code}`;
    return axiosClient.post(path);
  },
  addNewVoucher: (payload: IPayloadVoucher): Promise<VoucherResponse> => {
    const path = `api/voucher`;
    return axiosClient.post(path, payload);
  },
  updateVoucher: (id: string, payload: IPayloadVoucher): Promise<VoucherResponse> => {
    const path = `api/voucher/${id}`;
    return axiosClient.put(path, payload);
  },
  deleteVoucher: (id: string): Promise<IResponse> => {
    const path = `api/voucher/${id}`;
    return axiosClient.delete(path);
  }
};
