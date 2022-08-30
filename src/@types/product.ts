import { ICurrentUser } from "./user";

export interface IReview {
  _id: string;
  productId: string;
  orderId: string;
  comment: string;
  rating: number;
  user: ICurrentUser;
  createdAt: string;
  updatedAt: string;
}

export interface IProduct {
  _id: string;
  name: string;
  image: string;
  images: string[];
  description: string;
  category: string;
  oldPrice: number;
  price: number;
  rating: number;
  stock: number;
  sold: number;
  view: number;
  reviews: IReview[];
}
