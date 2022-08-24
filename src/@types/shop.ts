export interface IShop {
  name: string;
  avatar: string;
  city: { id: string; name: string };
  district: { id: string; name: string };
  ward: { id: string; name: string };
  street: string;
  administrative: string;
  address: string;
}
