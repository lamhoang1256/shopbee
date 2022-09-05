import { ICart, ICurrentUser, INotification, IUseStore } from "@types";
import { getCurrentUserLocalStorage, setCurrentUserLocalStorage } from "utils/localStorage";
import create from "zustand";

export const useStore = create<IUseStore>((set) => ({
  carts: [],
  setCart: (carts: ICart[]) => set({ carts }),
  currentUser: getCurrentUserLocalStorage(),
  setCurrentUser: (currentUser: ICurrentUser) => {
    setCurrentUserLocalStorage(currentUser);
    set({ currentUser });
  },
  notifications: [],
  setNotifications: (notifications: INotification[]) => set({ notifications }),
}));
