import { ICurrentUser } from "./user.type";
import { SuccessResponse } from "./utils.type";

export interface IDecodedToken {
  email: string;
  exp: number;
  iat: number;
  isAdmin: boolean;
  _id: string;
}

export interface IPayloadAuth {
  email: string;
  password: string;
}

export type AuthResponse = SuccessResponse<ICurrentUser>;
