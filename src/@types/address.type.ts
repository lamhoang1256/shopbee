import { SuccessResponse } from "./utils.type";

export interface ICity {
  ID: string;
  cityId: string;
  name: string;
}

export interface IDistrict {
  cityId: string;
  districtId: string;
  name: string;
}

export interface IWard {
  districtId: string;
  wardId: string;
  name: string;
}

export interface IShopAddress {
  _id: string;
  cityId: string;
  districtId: string;
  wardId: string;
  street: string;
  administrative: string;
  address: string;
  default: boolean;
}

export interface IParamsDistrict {
  cityId?: string;
}

export interface IParamsWard {
  districtId?: string;
}

export type CityResponse = SuccessResponse<ICity[]>;
export type DistrictResponse = SuccessResponse<IDistrict[]>;
export type WardResponse = SuccessResponse<IWard[]>;
