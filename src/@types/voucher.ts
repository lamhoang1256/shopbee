export interface IVoucher {
  code: string;
  createdAt: string;
  description: string;
  expirationDate: string;
  image: string;
  updatedAt: string;
  userUsed: string[];
  value: number;
  _id: string;
}
