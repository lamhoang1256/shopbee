import { ICart } from "./cart.type";
import { ICurrentUser } from "./user.type";

export interface IResponse {
  data?: any;
  message: string;
  status: number;
  success: boolean;
  [key: string]: any;
}
export interface IUseStore {
  carts: ICart[];
  setCart: (carts: ICart[]) => void;
  currentUser: ICurrentUser;
  setCurrentUser: (currentUser: ICurrentUser) => void;
  notifications: INotification[];
  setNotifications: (notifications: INotification[]) => void;
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
  pageCount: number;
}
export interface INotification {
  _id: string;
  user: string;
  title: string;
  desc: string;
  image: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
}
