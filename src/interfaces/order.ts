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
  user: {
    _id: string;
    email: string;
    fullname: string;
  };
  orderItems: IOrderProductItem[];
  shippingAddress: string;
  shippingPrice: number;
  totalPriceProduct: number;
  totalDiscount: number;
  totalPayment: number;
  isPaid: true;
  isDelivered: true;
  isShipping: true;
  paidAt: string;
  createdAt: string;
  updatedAt: string;
  shippingAt: string;
  deliveredAt: string;
}
