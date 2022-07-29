export interface ICart {
  _id: string;
  user: string;
  product: {
    priceSale: number;
    _id: string;
    name: string;
    image: string;
    images: string[];
    category: any;
    price: number;
    rating: number;
    salePrice: number;
    quantity: number;
    sold: number;
    view: number;
  };
  quantity: number;
  status: number;
  createdAt: string;
  updatedAt: string;
}
