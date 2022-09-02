export interface IShop {
  _id: string;
  name: string;
  avatar: string;
  city: { id: string; name: string };
  district: { id: string; name: string };
  ward: { id: string; name: string };
  street: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}
