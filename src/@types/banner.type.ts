export interface IBanner {
  _id: string;
  bannerUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IPayloadAddNewBanner {
  bannerUrl: string;
}
export interface IPayloadUpdateBanner extends IPayloadAddNewBanner {}
