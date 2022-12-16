export interface SuccessResponse<Data> {
  data: Data;
  message: string;
  status: number;
  success: boolean;
  [key: string]: any;
}

export interface ErrorResponse<Data> {
  data?: Data;
  message: string;
  status: number;
  success: boolean;
  [key: string]: any;
}

export interface IResponse {
  data?: any;
  message: string;
  status: number;
  success: boolean;
  [key: string]: any;
}

export interface IErrorData {
  status: number;
  success: boolean;
  message: string;
  error?: { [key: string]: string }[];
}

export interface ICloudinaryUpload {
  asset_id: string;
  bytes: number;
  created_at: string;
  format: string;
  height: number;
  public_id: string;
  resource_type: string;
  secure_url: string;
  url: string;
  version_id: string;
  width: number;
}

export interface IPagination {
  limit: number;
  page: number;
  totalPage: number;
}

export interface INotification {
  _id: string;
  user: string;
  title: string;
  desc: string;
  image: string;
  updatedAt: string;
  createdAt: string;
  haveSeen: boolean;
  __v: number;
}
