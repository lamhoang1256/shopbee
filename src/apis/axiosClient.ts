import axios from "axios";
import { ICurrentUser } from "interfaces";
import queryString from "query-string";
import { getCurrentUserLocalStorage, setCurrentUserLocalStorage } from "utils/localStorage";

const currentUser: ICurrentUser = getCurrentUserLocalStorage();
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API,
  paramsSerializer: (params) => queryString.stringify(params),
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser?.accessToken}`,
  },
});

const requestRefreshToken = async () => {
  const path = `${process.env.REACT_APP_API}/api/auth/refresh-token?refreshToken=${currentUser.refreshToken}`;
  const { data } = await axios.post(path);
  return data.data;
};

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
      try {
        const { accessToken, refreshToken } = await requestRefreshToken();
        response.config.headers.Authorization = `Bearer ${accessToken}`;
        setCurrentUserLocalStorage({ accessToken, refreshToken });
        return await axiosClient(response.config);
      } catch (err: any) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
