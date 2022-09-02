import { IReview } from "./review.type";

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
export interface IProductSearchParams {
  page: string;
  limit: string;
  category: string;
  rating: string;
  price_max: string;
  price_min: string;
  sort_by: string;
  order: string;
  name: string;
}
export type IPayloadAddNewProduct = Omit<IProduct, "_id" | "reviews">;
export type IPayloadUpdateProduct = Omit<IProduct, "_id" | "reviews">;
