import { ICurrentUser } from "./user.type";

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
export interface IPayloadAddNewReview {
  rating: number;
  comment: string;
  productId: string;
  orderId: string;
}
export interface IPayloadUpdateReview extends IPayloadAddNewReview {}
