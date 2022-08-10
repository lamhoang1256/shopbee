import axios from "axios";
import { IResponse } from "interfaces";

export const authApi = {
  requestRefreshToken: (params: any): Promise<IResponse> => {
    const path = `api/auth/refresh-token`;
    return axios.post(path, { params });
  },
};
