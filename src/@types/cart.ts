import { IProduct } from "./product";

export interface ICart {
  _id: string;
  user: string;
  product: IProduct;
  quantity: number;
  status: number;
  createdAt: string;
  updatedAt: string;
}
