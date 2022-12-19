import { ICart } from "./cart.type";
import { ICurrentUser } from "./user.type";
import { INotification } from "./utils.type";

export interface IUseStore {
  carts: ICart[];
  setCarts: (carts: ICart[]) => void;
  cartsOutOfStock: ICart[];
  setCartsOutOfStock: (carts: ICart[]) => void;
  currentUser: ICurrentUser | null;
  setCurrentUser: (currentUser: ICurrentUser | null) => void;
  notifications: INotification[];
  setNotifications: (notifications: INotification[]) => void;
}
