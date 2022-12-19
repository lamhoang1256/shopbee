import { LocalStorage } from "constants/localStorage";
import { ICurrentUser, IProduct } from "@types";

export const getCurrentUserLocalStorage: () => ICurrentUser | null = () => {
  return JSON.parse(localStorage.getItem(LocalStorage.currentUser) || "{}");
};

export const removeCurrentUserLocalStorage = () => {
  localStorage.removeItem(LocalStorage.currentUser);
};

export const setCurrentUserLocalStorage = (user: Partial<ICurrentUser> | null) => {
  const currentUser = getCurrentUserLocalStorage();
  const newCurrentUser = { ...currentUser, ...user };
  localStorage.setItem(LocalStorage.currentUser, JSON.stringify(newCurrentUser));
};

export const getRefreshTokenLocalStorage = () => {
  const currentUser = getCurrentUserLocalStorage();
  return currentUser?.refreshToken;
};

export const getAccessTokenLocalStorage = () => {
  const currentUser = getCurrentUserLocalStorage();
  return currentUser?.accessToken;
};

export const getHistoryLocalStorage: () => IProduct[] = () => {
  return JSON.parse(localStorage.getItem(LocalStorage.history) || "[]");
};

export const setHistoryLocalStorage = (products: IProduct[]) => {
  localStorage.setItem(LocalStorage.history, JSON.stringify(products));
};

export const removeHistoryLocalStorage: () => void = () => {
  return localStorage.removeItem(LocalStorage.history);
};
