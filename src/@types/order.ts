import { IProduct } from "./product";

export enum IOrderStatus {
  waiting = "waiting",
  processing = "processing",
  shipping = "shipping",
  delivered = "delivered",
  canceled = "canceled",
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
  status: IOrderStatus;
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
  label: string;
  display: string;
}

export interface IPayment {
  label: string;
  value: number;
}
