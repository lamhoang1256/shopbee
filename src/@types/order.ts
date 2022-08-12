export interface IOrderProductItem {
  name: string;
  quantity: number;
  image: string;
  price: number;
  priceSale: number;
  product: string;
  _id: string;
}
export interface IOrder {
  _id: string;
  orderItems: IOrderProductItem[];
  shippingFrom: string;
  shippingTo: string;
  shippingPrice: number;
  totalPriceProduct: number;
  totalDiscount: number;
  totalPayment: number;
  isPaid: boolean;
  isDelivered: boolean;
  isShipping: boolean;
  paidAt: string;
  createdAt: string;
  updatedAt: string;
  shippingAt: string;
  deliveredAt: string;
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
