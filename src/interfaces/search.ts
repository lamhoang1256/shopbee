export interface ISearchParams {
  page: string | number;
  limit: string | number;
  category: string;
  rating: string;
  price_max: string | number;
  price_min: string | number;
  sort_by: string;
  order: string;
  name: string;
}
