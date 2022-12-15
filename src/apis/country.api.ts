import { CityResponse, DistrictResponse, IParamsDistrict, IParamsWard, WardResponse } from "@types";
import axios from "axios";
import queryString from "query-string";

const axiosAddress = axios.create({
  baseURL: process.env.REACT_APP_API_ADMINISTRATION_URL,
  paramsSerializer: (params) => queryString.stringify(params),
  headers: { "Content-Type": "application/json" }
});

export const countryAPI = {
  getAllCity: (): Promise<CityResponse> => {
    const path = `/city`;
    return axiosAddress.get(path);
  },
  getAllDistrict: (params: IParamsDistrict): Promise<DistrictResponse> => {
    const path = `/district`;
    return axiosAddress.get(path, { params });
  },
  getAllWard: (params: IParamsWard): Promise<WardResponse> => {
    const path = `/ward`;
    return axiosAddress.get(path, { params });
  }
};
