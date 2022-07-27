import axios from "axios";
import queryString from "query-string";
import { toast } from "react-toastify";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API,
  paramsSerializer: (params) => queryString.stringify(params),
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response) => {
    const result = { ...response.data, status: response.status };
    return result;
  },
  ({ response }) => {
    if (response.status === 401) {
      toast.error(response.data.message, {
        autoClose: 3000,
      });
    }
    const result = { ...response.data, status: response.status };
    return Promise.reject(result);
  },
);

export default axiosClient;
