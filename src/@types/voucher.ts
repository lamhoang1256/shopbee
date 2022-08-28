export interface IVoucher {
  code: string;
  createdAt: string;
  title: string;
  expirationDate: number;
  updatedAt: string;
  usersUsed: string[];
  usersSave: string[];
  value: number;
  _id: string;
}
