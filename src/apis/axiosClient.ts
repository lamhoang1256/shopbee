import axios from "axios";
import queryString from "query-string";
import {
  getAccessTokenLocalStorage,
  getRefreshTokenLocalStorage,
  setCurrentUserLocalStorage
} from "utils/localStorage";

const BASE_URL_API = process.env.REACT_APP_API_URL;
const axiosClient = axios.create({
  baseURL: BASE_URL_API,
  paramsSerializer: (params) => queryString.stringify(params)
});

const requestRefreshToken = async () => {
  const refreshToken = getRefreshTokenLocalStorage();
  const path = `${BASE_URL_API}/api/auth/refresh-token?refreshToken=${refreshToken}}`;
  const { data } = await axios.post(path);
  return data.data;
};

axiosClient.interceptors.request.use(
  async (config) => {
    const customConfig = {
      ...config,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessTokenLocalStorage()}`
      }
    };
    return customConfig;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosClient.interceptors.response.use(
  async (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  async (error) => {
    const { response } = error;
    if (response?.status === 401 && response.data?.error?.message === "jwt expired") {
      try {
        const { accessToken, refreshToken } = await requestRefreshToken();
        response.config.headers.Authorization = `Bearer ${accessToken}`;
        setCurrentUserLocalStorage({ accessToken, refreshToken });
        return await axiosClient(response.config);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    const errorResult = { ...response.data, status: response.status };
    return Promise.reject(errorResult);
  }
);

export default axiosClient;
