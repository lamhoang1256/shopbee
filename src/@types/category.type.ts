export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
export interface IPayloadAddNewCategory {
  name: string;
  slug: string;
  image: string;
}
export interface IPayloadUpdateCategory extends IPayloadAddNewCategory {}
