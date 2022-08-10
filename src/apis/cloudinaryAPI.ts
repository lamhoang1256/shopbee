import axios from "axios";
import { ICloudinaryUpload } from "@types";

const axiosCloudinary = axios.create({
  baseURL: process.env.REACT_APP_CLOUDINARY_API,
});

axiosCloudinary.interceptors.response.use(
  (response) => {
    const result = { ...response.data, status: response.status };
    return result;
  },
  ({ response }) => {
    const result = { ...response.data, status: response.status };
    return Promise.reject(result);
  },
);

export const configCloudinaryAPI = {
  uploadImage: (payload: any): Promise<ICloudinaryUpload> => {
    const path = `/image/upload`;
    return axiosCloudinary.post(path, payload);
  },
};
