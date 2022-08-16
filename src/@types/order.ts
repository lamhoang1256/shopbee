import { IProduct } from "./product";

export enum OrderStatusEnum {
  waiting = "waiting",
  processing = "processing",
  shipping = "shipping",
  delivered = "delivered",
  canceled = "canceled",
}
export enum IOrderStatusCode {
  waiting = 0,
  processing = 1,
  shipping = 2,
  delivered = 3,
  canceled = 4,
}
export interface IOrderItem {
  product: IProduct;
  quantity: number;
}
export interface IOrder {
  _id: string;
  orderItems: IOrderItem[];
  shippingFrom: string;
  shippingTo: string;
  shippingFee: number;
  oldPrice: number;
  price: number;
  promotion: number;
  total: number;
  status: OrderStatusEnum;
  statusCode: IOrderStatusCode;
  shippingAt: string;
  deliveredAt: string;
  canceledAt: string;
  createdAt: string;
  updatedAt: string;
  user: {
    _id: string;
    email: string;
    fullname: string;
  };
}

export interface IStatusOrder {
  active: boolean;
  icon: any;
  date: string;
  status: string;
}

export interface IPayment {
  label: string;
  value: number;
}
