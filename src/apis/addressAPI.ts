import { IResponse } from "@types";
import axios from "axios";
import queryString from "query-string";
import axiosClient from "./axiosClient";

const axiosClientAddress = axios.create({
  baseURL: process.env.REACT_APP_ADMINISTRATION,
  paramsSerializer: (params) => queryString.stringify(params),
  headers: {
    "Content-Type": "application/json",
  },
});

export const addressAPI = {
  getAllCity: () => {
    const path = `/province`;
    return axiosClientAddress.get(path);
  },
  getAllDistrict: (params: any) => {
    const path = `/district`;
    return axiosClientAddress.get(path, { params });
  },
  getAllCommune: (params: any) => {
    const path = `/commune`;
    return axiosClientAddress.get(path, { params });
  },
  getAllShopAddress: (): Promise<IResponse> => {
    const path = `/api/shop/address`;
    return axiosClient.get(path);
  },
  getSingleShopAddress: (addressId: string): Promise<IResponse> => {
    const path = `api/shop/address/${addressId}`;
    return axiosClient.get(path);
  },
  updateShopAddress: (values: any, addressId: string): Promise<IResponse> => {
    const path = `api/shop/address/${addressId}`;
    return axiosClient.put(path, values);
  },
  changeDefaultShopAddress: (addressId: string): Promise<IResponse> => {
    const path = `api/shop/address/${addressId}/default`;
    return axiosClient.put(path);
  },
  deleteShopAddress: (addressId: string): Promise<IResponse> => {
    const path = `api/shop/address/${addressId}`;
    return axiosClient.delete(path);
  },
};
