import { ICart } from "@types";

export const formatMoney = (money: number) => {
  return money?.toLocaleString("vi", { style: "currency", currency: "VND" });
};

export const formatDateVN = (timestamp: string | number) => {
  return new Date(timestamp).toLocaleDateString();
};

export const formatCash = (num: number) => {
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1).replace(/\.0$/, "")}b`;
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1).replace(/\.0$/, "")}m`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return num;
};

export const calcTotalCart = (array: ICart[], key: "oldPrice" | "price") => {
  const totalMoney = array?.reduce((previousValue: number, currentValue: ICart) => {
    return previousValue + currentValue.product[key] * currentValue.quantity;
  }, 0);
  return totalMoney;
};

export const formatDateVNFull = (timestamp: string | number) => {
  const date = new Date(timestamp);
  const days = `00${date.getDate()}`.slice(-2);
  const months = `00${date.getMonth() + 1}`.slice(-2);
  const years = date.getFullYear();
  const hours = `00${date.getHours()}`.slice(-2);
  const minutes = `00${date.getMinutes()}`.slice(-2);
  const seconds = `00${date.getSeconds()}`.slice(-2);
  return `${hours}:${minutes}:${seconds} ${days}/${months}/${years}`;
};

export const calcShippingFee = (shopCityId: string, userCityId: string) => {
  const distance = Math.abs(Number(shopCityId) - Number(userCityId));
  return 10000 + distance * 1000;
};

export const scrollToTop = (top: number = 0) => {
  window.scrollTo({
    top,
    behavior: "smooth",
  });
};

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function formatDatetimeLocal(date: Date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().substring(0, 19);
}
