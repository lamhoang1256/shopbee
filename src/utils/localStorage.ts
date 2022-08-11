import { LocalStorage } from "constants/localStorage";
import { ICurrentUser } from "@types";

export const getCurrentUserLocalStorage: () => ICurrentUser = () => {
  return JSON.parse(localStorage.getItem(LocalStorage.currentUser) || "{}");
};

export const getRefreshTokenLocalStorage = () => {
  const currentUser = getCurrentUserLocalStorage();
  return currentUser?.refreshToken;
};

export const removeCurrentUserLocalStorage = () => {
  localStorage.removeItem(LocalStorage.currentUser);
};

export const setCurrentUserLocalStorage = (user: Partial<ICurrentUser>) => {
  const currentUser = getCurrentUserLocalStorage();
  const newCurrentUser = { ...currentUser, ...user };
  localStorage.setItem(LocalStorage.currentUser, JSON.stringify(newCurrentUser));
};

export const getAccessTokenLocalStorage = () => {
  const currentUser = getCurrentUserLocalStorage();
  return currentUser?.accessToken;
};
