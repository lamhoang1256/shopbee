import { getRandomInt } from "utils/helper";

export const initValuesProduct = {
  name: "",
  image: "",
  description: "",
  category: "",
  oldPrice: 0,
  price: 0,
  rating: 0,
  stock: 0,
  sold: 0,
  view: getRandomInt(0, 10000),
};

export const initAdministrative = {
  city: "",
  district: "",
  ward: "",
};
