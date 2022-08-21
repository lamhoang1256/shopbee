export interface IRefreshToken {
  refreshToken: string;
}
export interface IDecodedToken {
  email: string;
  exp: number;
  iat: number;
  isAdmin: boolean;
  _id: string;
}
