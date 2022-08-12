export interface IProvince {
  ID: string;
  idProvince: string;
  name: string;
}
export interface IDistrict {
  idProvince: string;
  idDistrict: string;
  name: string;
}
export interface ICommune {
  idDistrict: string;
  idCommune: string;
  name: string;
}
export interface IShopAddress {
  _id: string;
  addressDetail: string;
  addressAdministrative: string;
  addressIdProvince: string;
  addressIdDistrict: string;
  addressIdCommune: string;
  settingDefault: boolean;
}
