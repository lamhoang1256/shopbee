import { IProduct } from "./product.type";

export interface ICart {
  _id: string;
  user: string;
  product: IProduct;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}
export interface IPayloadAddToCart {
  productId: string;
  quantity: number;
}
