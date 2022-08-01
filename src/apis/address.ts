import axios from "axios";
import queryString from "query-string";

const axiosClientAddress = axios.create({
  baseURL: "https://sheltered-anchorage-60344.herokuapp.com",
  paramsSerializer: (params) => queryString.stringify(params),
  headers: {
    "Content-Type": "application/json",
  },
});

export const configAPIAddress = {
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
