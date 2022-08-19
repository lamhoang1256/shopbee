import { ICurrentUser } from "./user";

export interface IPayloadReview {
  reviewId?: string;
  comment: string;
  rating: number;
}

export interface IReview {
  _id: string;
  comment: string;
  rating: number;
  user: ICurrentUser;
  updatedAt: string;
  createdAt: string;
}

export interface IProduct {
  _id: string;
  name: string;
  image: string;
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
