export const initialValuesProduct = {
  name: "",
  image: "",
  images: [""],
  description: "",
  category: "",
  oldPrice: 0,
  price: 0,
  rating: 0,
  stock: 0,
  sold: 0,
  view: Math.floor(Math.random() * (10000 - 0 + 1)) + 0
};

export const initialValuesShopInfo = {
  name: "",
  avatar: "",
  street: "",
  address: "",
  city: { id: "", name: "" },
  district: { id: "", name: "" },
  ward: { id: "", name: "" }
};
