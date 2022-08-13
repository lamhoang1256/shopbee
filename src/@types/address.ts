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
  street: string;
  address: string;
  cityId: string;
  districtId: string;
  wardId: string;
  settingDefault: boolean;
}
