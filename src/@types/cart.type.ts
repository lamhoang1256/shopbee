import { IProduct } from "./product.type";
import { SuccessResponse } from "./utils.type";

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

export type CartResponse = SuccessResponse<ICart>;
export type CartsResponse = SuccessResponse<{ carts: ICart[]; cartsOutOfStock: ICart[] }>;
