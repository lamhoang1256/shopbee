export interface IDecodedToken {
  email: string;
  exp: number;
  iat: number;
  isAdmin: boolean;
  _id: string;
}
export interface IPayloadSignUp {
  email: string;
  password: string;
}
export interface IPayloadSignIn extends IPayloadSignUp {}
