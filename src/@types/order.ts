import { IProduct } from "./product";

export enum OrderStatusEnum {
  waiting = "waiting",
  processing = "processing",
  shipping = "shipping",
  delivered = "delivered",
  canceled = "canceled",
}
export enum OrderStatusLabelEnum {
  waiting = "Đang chờ",
  processing = "Đang xử lí",
  shipping = "Đang giao hàng",
  delivered = "Đã giao hàng",
  canceled = "Đã hủy",
}
export enum OrderStatusCodeEnum {
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
  note: string;
  status: OrderStatusEnum;
  statusCode: OrderStatusCodeEnum;
  shippingAt: string;
  deliveredAt: string;
  canceledAt: string;
  createdAt: string;
  updatedAt: string;
  reasonCancel: string;
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
