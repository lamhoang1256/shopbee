import { IPayloadGetAllDistrict, IPayloadGetAllWard } from "@types";
import axios from "axios";
import queryString from "query-string";

const axiosClientAddress = axios.create({
  baseURL: process.env.REACT_APP_API_ADMINISTRATION_URL,
  paramsSerializer: (params) => queryString.stringify(params),
  headers: { "Content-Type": "application/json" }
});

export const addressAPI = {
  getAllCity: () => {
    const path = `/city`;
    return axiosClientAddress.get(path);
  },
  getAllDistrict: (params: IPayloadGetAllDistrict) => {
    const path = `/district`;
    return axiosClientAddress.get(path, { params });
  },
  getAllWard: (params: IPayloadGetAllWard) => {
    const path = `/ward`;
    return axiosClientAddress.get(path, { params });
  }
};
