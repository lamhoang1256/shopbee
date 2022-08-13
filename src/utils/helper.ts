import { ICart } from "@types";

export const formatMoney = (money: number) => {
  return money?.toLocaleString("vi", { style: "currency", currency: "VND" });
};

export const formatDateVN = (timestamp: string) => {
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

export const calcTotalMoneyCart = (array: ICart[], key: "oldPrice" | "price") => {
  const totalMoney = array?.reduce((previousValue: number, currentValue: ICart) => {
    return previousValue + currentValue.product[key] * currentValue.quantity;
  }, 0);
  return totalMoney;
};

export const formatDateVNFull = (timestamp: string) => {
  const date = new Date(timestamp);
  const days = `00${date.getDate()}`.slice(-2);
  const months = `00${date.getMonth() + 1}`.slice(-2);
  const years = date.getFullYear();
  const hours = `00${date.getHours()}`.slice(-2);
  const minutes = `00${date.getMinutes()}`.slice(-2);
  const seconds = `00${date.getSeconds()}`.slice(-2);
  return `${hours}:${minutes}:${seconds} ${days}/${months}/${years}`;
};
