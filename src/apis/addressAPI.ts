import axios from "axios";
import queryString from "query-string";

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
};
