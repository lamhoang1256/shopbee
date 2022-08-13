export interface IProduct {
  _id: string;
  name: string;
  image: string;
  images: string[];
  description: string;
  category: string;
  oldPrice: number;
  rating: number;
  price: number;
  stock: number;
  sold: number;
  view: number;
}

export interface IProductPayload {
  name: string;
  image: string;
  description: string;
  category: string;
  oldPrice: number;
  price: number;
  quantity: number;
}
