import { ICart } from "./cart";
import { ICurrentUser } from "./user";

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
}
