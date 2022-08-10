import axios from "axios";
import { LocalStorage } from "constants/localStorage";
import { ICurrentUser } from "@types";
import queryString from "query-string";

const currentUser: ICurrentUser = JSON.parse(
  localStorage.getItem(LocalStorage.currentUser) || "{}",
);
console.log("currentUser: ", currentUser);

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API,
  paramsSerializer: (params) => queryString.stringify(params),
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser?.accessToken}`,
  },
});

const handleRefreshToken = async () => {
  const path = `${process.env.REACT_APP_API}/api/auth/refresh-token?refreshToken=${currentUser.refreshToken}`;
  const { data } = await axios.post(path);
  return data.data;
};

let refreshTokenRequest: any = null;
axiosClient.interceptors.response.use(
  async (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  async (error) => {
    const { response } = error;
    if (response.status === 401 && response.data.error.message === "jwt expired") {
      refreshTokenRequest = refreshTokenRequest || handleRefreshToken;
      try {
        const { accessToken, refreshToken } = await refreshTokenRequest();
        response.config.headers.Authorization = `Bearer ${accessToken}`;
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ ...currentUser, refreshToken, accessToken }),
        );
        return await axiosClient(response.config);
      } catch (err: any) {
        return Promise.reject(err);
      }
    }
    const errorResult = { ...response.data, status: response.status };
    return Promise.reject(errorResult);
  },
);

export default axiosClient;
