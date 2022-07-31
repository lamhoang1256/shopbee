import create from "zustand";
import { LocalStorage } from "constants/localStorage";

export const useStore = create((set) => ({
  currentUser: JSON.parse(localStorage.getItem(LocalStorage.currentUser) || "{}"),
  signIn: (user: any) => {
    localStorage.setItem(LocalStorage.currentUser, JSON.stringify(user));
    set({ currentUser: user });
  },
  cart: [],
  updateCart: (cart: any) => set({ cart }),
}));
