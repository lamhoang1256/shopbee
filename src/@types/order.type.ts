import { IProduct } from "./product.type";

export enum OrderStatus {
  waiting = "waiting",
  processing = "processing",
  shipping = "shipping",
  delivered = "delivered",
  canceled = "canceled",
}
export enum OrderStatusVietnamese {
  waiting = "Đang chờ",
  processing = "Đang xử lí",
  shipping = "Đang giao hàng",
  delivered = "Đã giao hàng",
  canceled = "Đã hủy",
}
export enum OrderStatusCode {
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
  status: OrderStatus;
  statusCode: OrderStatusCode;
  shippingAt: string;
  deliveredAt: string;
  canceledAt: string;
  createdAt: string;
  updatedAt: string;
  reasonCancel: string;
  methodPayment: string;
  user: {
    _id: string;
    email: string;
    fullname: string;
  };
}
export interface IPayloadBuyProduct {
  orderItems: IOrderItem[];
  shippingTo: string;
  price: number;
  note: string;
  shippingFee: number;
  promotion: number;
  total: number;
  voucherCode: string;
  methodPayment: string;
}
export interface IStatusOrder {
  active: boolean;
  icon: React.ReactNode;
  date: string;
  status: string;
}
export interface IOrderParams {
  [k: string]: string;
}
export interface IPayloadCancelOrder {
  reasonCancel: string;
}
