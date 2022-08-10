import { ICart, ICurrentUser, IUseStore } from "interfaces";
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
}));
