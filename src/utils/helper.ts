/* eslint-disable no-useless-escape */
import { IAddress, ICart, IProduct } from "@types";
import { getHistoryLocalStorage, setHistoryLocalStorage } from "./localStorage";

export const formatMoney = (money: number) => {
  return money?.toLocaleString("vi", { style: "currency", currency: "VND" });
};

export const formatDateVN = (timestamp: string | number) => {
  return new Date(timestamp).toLocaleDateString();
};

export const formatCash = (num: number) => {
  if (num >= 1000000000) return `${(num / 1000000000).toFixed(1).replace(/\.0$/, "")}b`;
  if (num >= 1000000) return `${(num / 1000000).toFixed(1).replace(/\.0$/, "")}m`;
  if (num >= 1000) return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return num;
};

export const calcTotalPrice = (carts: ICart[], key: "oldPrice" | "price") => {
  const totalPrice = carts.reduce((prevTotal: number, currentTotal: ICart) => {
    return prevTotal + currentTotal.product[key] * currentTotal.quantity;
  }, 0);
  return totalPrice;
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

export function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function scrollTo(top?: number, left?: number) {
  window.scroll({
    top: top || 0,
    left: left || 0,
    behavior: "smooth"
  });
}

export function formatDatetimeLocal(date: Date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().substring(0, 19);
}

export function isEmptyObject(obj: any) {
  return Object.keys(obj).length === 0;
}

export function removeEmptyStringValueObj(obj: { [key: string]: any }) {
  const cloneObj = obj;
  Object.keys(cloneObj).forEach((key) => {
    if (cloneObj[key] === "") delete cloneObj[key];
  });
  return cloneObj;
}

export function slugify(value: string) {
  const a = "àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;";
  const b = "aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");
  return value
    .toString()
    .toLowerCase()
    .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a")
    .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e")
    .replace(/i|í|ì|ỉ|ĩ|ị/gi, "i")
    .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o")
    .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u")
    .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y")
    .replace(/đ/gi, "d")
    .replace(/\s+/g, "-")
    .replace(p, (c) => b.charAt(a.indexOf(c)))
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export const saveHistoryView = (product: IProduct) => {
  if (!product?.name) return;
  let history: IProduct[] = getHistoryLocalStorage();
  if (history.length >= 20) history.splice(19, 1);
  const foundProductIndex = history.findIndex((item) => item._id === product._id);
  if (foundProductIndex !== -1) history = history.splice(foundProductIndex, 1);
  history.unshift(product);
  setHistoryLocalStorage(history);
};

export const generateAddress = (values: IAddress) => {
  const { street, city, district, ward } = values;
  const address = `${street}, ${ward.name}, ${district.name}, ${city.name}`;
  return address;
};

export const formatDateTimeLocal = (timestamp: number) => {
  const date = new Date(timestamp);
  let dateTime = "";
  let year: string | number = 0;
  let month: string | number = 0;
  let day: string | number = 0;
  let hour: string | number = 0;
  let min: string | number = 0;
  year = date.getFullYear();
  month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  day = date.getDate();
  day = day < 10 ? `0${day}` : day;
  hour = date.getHours();
  hour = hour < 10 ? `0${hour}` : hour;
  min = date.getMinutes();
  min = min < 10 ? `0${min}` : min;
  dateTime += `${year}-${month}-${day}`;
  dateTime += `T${hour}:${min}`;
  return dateTime;
};
