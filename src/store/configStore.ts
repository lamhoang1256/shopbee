import create from "zustand";
import { LocalStorage } from "constants/localStorage";
import { ICart, ICurrentUser, IUseStore } from "interfaces";

export const useStore = create<IUseStore>((set) => ({
  carts: [],
  setCart: (carts: ICart[]) => set({ carts }),
  currentUser: JSON.parse(localStorage.getItem(LocalStorage.currentUser) || "{}"),
  setCurrentUser: (currentUser: ICurrentUser) => {
    localStorage.setItem(LocalStorage.currentUser, JSON.stringify(currentUser));
    set({ currentUser });
  },
}));
