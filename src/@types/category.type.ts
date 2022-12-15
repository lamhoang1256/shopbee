import { SuccessResponse } from "./utils.type";

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPayloadCategory {
  name: string;
  slug: string;
  image: string;
}

export type CategoriesResponse = SuccessResponse<ICategory[]>;
export type CategoryResponse = SuccessResponse<ICategory>;
