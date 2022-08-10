export interface IProvince {
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
