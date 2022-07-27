import { LocalStorage } from "constants/localStorage";
import create from "zustand";

const currentUser = JSON.parse(localStorage.getItem(LocalStorage.currentUser) || "{}");
export const useStore = create(() => ({ currentUser }));
