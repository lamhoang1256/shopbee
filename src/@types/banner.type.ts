import { SuccessResponse } from "./utils.type";

export interface IBanner {
  _id: string;
  bannerUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type BannersResponse = SuccessResponse<IBanner[]>;
export type BannerResponse = SuccessResponse<IBanner>;
