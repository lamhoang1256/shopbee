import { LocalStorage } from "constants/localStorage";
import { ICurrentUser } from "interfaces";

export const getCurrentUserLocalStorage = () => {
  return JSON.parse(localStorage.getItem(LocalStorage.currentUser) || "{}");
};

export const setCurrentUserLocalStorage = (newCurrentUser: Partial<ICurrentUser>) => {
  const currentUser = getCurrentUserLocalStorage();
  localStorage.setItem(
    LocalStorage.currentUser,
    JSON.stringify({ ...currentUser, ...newCurrentUser }),
  );
};
