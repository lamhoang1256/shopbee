export interface IProduct {
  _id: string;
  name: string;
  image: string;
  images: string[];
  description: string;
  category: string;
  price: number;
  rating: number;
  priceSale: number;
  quantity: number;
  sold: number;
  view: number;
}

export interface IProductPayload {
  name: string;
  image: string;
  description: string;
  category: string;
  price: number;
  priceSale: number;
  quantity: number;
}
