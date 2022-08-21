export interface IVoucher {
  code: string;
  createdAt: string;
  title: string;
  expirationDate: string;
  updatedAt: string;
  userUsed: string[];
  value: number;
  _id: string;
}
