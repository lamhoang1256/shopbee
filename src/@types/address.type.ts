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
export interface IPayloadGetAllDistrict {
  cityId?: string;
}
export interface IPayloadGetAllWard {
  districtId?: string;
}
